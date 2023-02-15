// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs as suiBcs } from '@mysten/sui.js';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useRpc } from '~/hooks/useRpc';
import { PlaceholderTable } from '~/ui/PlaceholderTable';

const SYSTEM_EPOCH_INFO = '0x2::sui_system::SystemEpochInfo';

suiBcs.registerStructType(SYSTEM_EPOCH_INFO, {
    epoch: 'u64',
    referenceGasPrice: 'u64',
    totalStake: 'u64',
    storageFundInflows: 'u64',
    storageFundOutflows: 'u64',
    storageFundBalance: 'u64',
    stakeSubsidyAmount: 'u64',
    totalGasFees: 'u64',
    totalStakeRewards: 'u64',
});

export default function Epochs() {
    const rpc = useRpc();
    const { data: epochData, isLoading } = useQuery(['epochs'], async () => {
        // get epoch info

        // todo: should we move this to JSON RPC?
        const { data, isSuccess } = await rpc.getEvents(
            { MoveEvent: SYSTEM_EPOCH_INFO },
            null,
            100,
            'descending'
        );

        return data;
    });

    const tableData = useMemo(
        () =>
            epochData?.map(({ event, timestamp, txDigest }) => {
                const fields = event.moveEvent.fields;
                const {
                    epoch,
                    reference_gas_price,
                    storage_fund_balance,
                    storage_fund_inflows,
                    storage_fund_outflows,
                    total_gas_fees,
                    total_stake,
                    total_stake_rewards,
                    stake_subsidy_amount,
                } = fields;
                return {
                    epoch,
                    reference_gas_price,
                    storage_fund_balance,
                    storage_fund_inflows,
                    storage_fund_outflows,
                    total_gas_fees,
                    total_stake,
                    total_stake_rewards,
                    stake_subsidy_amount,
                };
            }),
        [epochData]
    );

    console.log(tableData);

    return (
        <section>
            <div>hi</div>
            {isLoading && (
                <PlaceholderTable
                    rowCount={20}
                    rowHeight="13px"
                    colHeadings={['time', 'number']}
                    colWidths={['50%', '50%']}
                />
            )}
        </section>
    );
}
