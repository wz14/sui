// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { Card } from '~/ui/Card';
import { EpochProgress } from '~/ui/EpochProgress';

export function EpochStats() {
    // todo: replace this with mocks
    const startTs = new Date().setHours(new Date().getHours() - 3);
    const endTs = new Date().setHours(new Date().getHours() + 2);
    return (
        <Card spacing="lg">
            <EpochProgress epoch={16} startTs={startTs} endTs={endTs} />
        </Card>
    );
}
