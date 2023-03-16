// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { Transaction } from '@mysten/sui.js';
import { useCallback, useMemo } from 'react';

import { UserApproveContainer } from '_components/user-approve-container';
import { useAppDispatch } from '_hooks';
import { type TransactionApprovalRequest } from '_payloads/transactions/ApprovalRequest';
import { respondToTransactionRequest } from '_redux/slices/transaction-requests';
import { PageMainLayoutTitle } from '_src/ui/app/shared/page-main-layout/PageMainLayoutTitle';

import st from './TransactionRequest.module.scss';
import { Transaction } from '@mysten/sui.js';
import { TransactionDetails } from './TransactionDetails';
import { GasFees } from './GasFees';

export type TransactionRequestProps = {
    txRequest: TransactionApprovalRequest;
};

export function TransactionRequest({ txRequest }: TransactionRequestProps) {
    const dispatch = useAppDispatch();
    const transaction = useMemo(
        () => Transaction.from(txRequest.tx.data),
        [txRequest.tx.data]
    );
    const addressForTransaction = txRequest.tx.account;
    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            await dispatch(
                respondToTransactionRequest({
                    approved,
                    txRequestID: txRequest.id,
                    addressForTransaction,
                })
            );
        },
        [dispatch, txRequest, addressForTransaction]
    );

    console.log(transaction);
    return (
        <UserApproveContainer
            origin={txRequest.origin}
            originFavIcon={txRequest.originFavIcon}
            approveTitle="Approve"
            rejectTitle="Reject"
            onSubmit={handleOnSubmit}
            address={addressForTransaction}
        >
            <PageMainLayoutTitle title="Approve Transaction" />
            <section className={st.txInfo}>
                {/* MUSTFIX(chris) */}
                {/* <TransactionSummaryCard
                    transaction={tx}
                    address={addressForTransaction}
                /> */}
                <GasFees transaction={transaction} />
                <TransactionDetails transaction={transaction} />
            </section>
        </UserApproveContainer>
    );
}
