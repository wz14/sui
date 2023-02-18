// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { type Meta, type StoryObj } from '@storybook/react';

import { EpochProgress, type EpochProgressProps } from '../EpochProgress';

export default {
    component: EpochProgress,
} as Meta;

export const Default: StoryObj<EpochProgressProps> = {
    args: {
        epoch: 16,
        startTs: new Date().setHours(new Date().getHours() - 3),
        endTs: new Date().setHours(new Date().getHours() + 2),
    },
    render: (args) => (
        <div className="flex h-[216px]">
            <EpochProgress {...args} />
        </div>
    ),
};
