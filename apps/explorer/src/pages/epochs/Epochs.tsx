// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs as suiBcs } from '@mysten/sui.js';
import { useQuery } from '@tanstack/react-query';

import { useRpc } from '~/hooks/useRpc';

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

        const { data } = await rpc.getEvents(
            { MoveEvent: SYSTEM_EPOCH_INFO },
            null,
            100,
            'descending'
        );

        return data;
    });

    return null;
}
