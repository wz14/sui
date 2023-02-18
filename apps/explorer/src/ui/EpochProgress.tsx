// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { Card } from './Card';
import { Heading } from './Heading';
import { ProgressBar } from './ProgressBar';
import { Text } from './Text';

export interface EpochProgressProps {
    epoch?: number;
    startTs: number;
    endTs: number;
}

export function EpochProgress({
    epoch = 1,
    startTs,
    endTs,
}: EpochProgressProps) {
    const now = Date.now();
    const progress = Math.round(((now - startTs) / (endTs - startTs)) * 100);

    return (
        <div className="flex w-full flex-nowrap">
            <Card spacing="lg">
                <div className="flex h-full flex-col justify-between">
                    <div className="space-y-2">
                        <Heading
                            color="steel-darker"
                            variant="heading3/semibold"
                        >
                            Epoch {epoch}
                        </Heading>
                        <div>
                            <Text variant="p4/normal" color="steel-darker">
                                STARTED
                            </Text>
                            <Text variant="p3/semibold" color="steel-darker">
                                {startTs.toString()}
                            </Text>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Heading variant="heading6/medium" color="steel-darker">
                            3 hr left
                        </Heading>
                        <ProgressBar progress={progress} />
                    </div>
                </div>
            </Card>
        </div>
    );
}
