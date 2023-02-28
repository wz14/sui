// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { useQuery } from '@tanstack/react-query';

import { getCheckpoints } from './mocks';

import { TxTimeType } from '~/components/tx-time/TxTimeType';
import { Text } from '~/ui/Text';

export function useCheckpointsTable(epoch?: number) {
    return checkpointsTable;
}
