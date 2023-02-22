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
export const getEpochs = async () => [
    {
        timestamp: 1677007865376,
        epoch: '5',
        protocol_version: '1',
        reference_gas_price: '1',
        transaction_count: '7478',
        stake_subsidy_amount: '163796375',
        storage_fund_balance: '211185714',
        storage_fund_inflows: '236885183',
        storage_fund_outflows: '181263026',
        total_gas_fees: '1243569447',
        total_stake: '2252830614282',
        total_stake_rewards: '1407359918',
    },
    {
        timestamp: 1676921471552,
        epoch: '4',
        protocol_version: '1',
        reference_gas_price: '1',
        transaction_count: '3125',
        stake_subsidy_amount: '90791523',
        storage_fund_balance: '155563552',
        storage_fund_inflows: '345407534',
        storage_fund_outflows: '272415832',
        total_gas_fees: '1801419984',
        total_stake: '1637963758756',
        total_stake_rewards: '1892203317',
    },
    {
        timestamp: 1676835049533,
        epoch: '3',
        protocol_version: '1',
        reference_gas_price: '1',
        transaction_count: '9156',
        stake_subsidy_amount: '37919639',
        storage_fund_balance: '82571847',
        storage_fund_inflows: '387002007',
        storage_fund_outflows: '326921434',
        total_gas_fees: '1175860241',
        total_stake: '907915232443',
        total_stake_rewards: '1213776394',
    },
    {
        timestamp: 1676748642241,
        epoch: '2',
        protocol_version: '1',
        reference_gas_price: '1',
        transaction_count: '5988',
        stake_subsidy_amount: '0',
        storage_fund_balance: '22491270',
        storage_fund_inflows: '68592966',
        storage_fund_outflows: '46101699',
        total_gas_fees: '400504410',
        total_stake: '379196391747',
        total_stake_rewards: '396499366',
    },
    {
        timestamp: 1676662309642,
        epoch: '1',
        protocol_version: '1',
        reference_gas_price: '1',
        transaction_count: '6531',
        stake_subsidy_amount: '0',
        storage_fund_balance: '1',
        storage_fund_inflows: '0',
        storage_fund_outflows: '0',
        total_gas_fees: '0',
        total_stake: '4',
        total_stake_rewards: '0',
    },
];

// getCheckpoints()
export const getCheckpoints = async () =>
    Array(200).fill({ length: 200 }).map(getCheckpoint);

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
