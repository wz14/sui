// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getCheckpoints, getCurrentEpoch } from './mocks';

import { Card } from '~/ui/Card';
import { EpochProgress } from '~/ui/EpochProgress';
import { TableCard } from '~/ui/TableCard';

// SPDX-License-Identifier: Apache-2.0
export function EpochDetail() {
    const { number } = useParams<{ number: string }>();
    const { data, isLoading } = useQuery(
        ['epoch', number],
        async () => await getCurrentEpoch()
    );

    const { data: checkpoints, isLoading: checkpointsLoading } = useQuery(
        ['checkpoints', number],
        async () => await getCheckpoints()
    );

    // todo: loading / error states
    if (isLoading) {
        return <div>loading...</div>;
    }

    // todo: move this outta here
    const checkpointsTable = checkpoints?.map((checkpoint: any) => ({
        data: {
            epoch: <div>{checkpoint.epoch}</div>,
            sequenceNumber: <div>{checkpoint.sequence_number}</div>,
            contentDigest: <div>{checkpoint.content_digest}</div>,
            previousDigest: <div>{checkpoint.previous_digest}</div>,
        },
        columns: [
            { header: 'Epoch', accessor: 'epoch' },
            { header: 'Sequence Number', accessor: 'sequenceNumber' },
            { header: 'Content Digest', accessor: 'contentDigest' },
            { header: 'Previous Digest', accessor: 'previousDigest' },
        ],
    }));

    // console.log(checkpointsTable);

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Card>
                    <div className="flex">
                        <Card>
                            <EpochProgress
                                startTs={Number(data?.start_timestamp)}
                                endTs={Number(data?.end_timestamp)}
                                epoch={Number(data?.epoch)}
                            />
                        </Card>
                    </div>
                </Card>
                <Card>
                    <div className="flex">
                        <Card>
                            <div />
                        </Card>
                    </div>
                </Card>
            </div>
        </div>
    );
}
