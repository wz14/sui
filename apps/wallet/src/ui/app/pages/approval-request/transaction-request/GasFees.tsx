// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Transaction } from '@mysten/sui.js';
import { useTransactionGasBudget } from '_src/ui/app/hooks';
import { GAS_SYMBOL } from '_src/ui/app/redux/slices/sui-objects/Coin';
import { DescriptionItem, DescriptionList } from './DescriptionList';
import { SummaryCard } from './SummaryCard';

interface Props {
    transaction: Transaction;
}

export function GasFees({ transaction }: Props) {
    const { data: gasBudget } = useTransactionGasBudget(transaction);

    return (
        <SummaryCard header="Estimated Gas Fees" initialExpanded>
            <DescriptionList>
                <DescriptionItem title="You Pay">
                    {gasBudget || '-'} {GAS_SYMBOL}
                </DescriptionItem>
                {/* TODO: Support sponsored transactions: */}
                {/* <DescriptionItem title="Sponsor Pays"></DescriptionItem>
				<DescriptionItem title="Sponsor"></DescriptionItem> */}
            </DescriptionList>
        </SummaryCard>
    );
}
