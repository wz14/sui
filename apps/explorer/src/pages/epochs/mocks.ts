// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// todo: remove this
import { faker } from '@faker-js/faker';

export type Epoch = {
    epoch: string;
    validators: any;
    transaction_count: string;
    checkpoint_set: [string, string];
    start_timestamp: number;
    end_timestamp: number;
};

export const getCurrentEpoch = async (): Promise<Epoch> => ({
    epoch: faker.random.numeric(2),
    validators: [],
    transaction_count: faker.random.numeric(7),
    checkpoint_set: [faker.random.numeric(5), faker.random.numeric(5)],
    start_timestamp: faker.date.past().getTime(),
    end_timestamp: faker.date.future().getTime(),
});

// getEpochs()
export const getEpochs = async () => {};

// getCheckpoints()
export const getCheckpoints = async () =>
    Array(200).fill(null).map(getCheckpoint);

// getCheckpoint()
export const getCheckpoint = async () => ({
    epoch: faker.random.numeric(2),
    sequence_number: faker.random.numeric(5),
    network_total_transactions: faker.random.numeric(7),
    content_digest: faker.git.commitSha(),
    previous_digest: faker.git.commitSha(),
    epoch_rolling_gas_cost_summary: {
        computation_cost: faker.datatype.number(),
        storage_cost: faker.datatype.number(),
        storage_rebate: faker.datatype.number(),
    },
    transactions: [],
});
