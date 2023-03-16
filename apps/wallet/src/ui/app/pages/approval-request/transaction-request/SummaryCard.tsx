// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ChevronDown16, ChevronRight16 } from '@mysten/icons';
import { useState, type ReactNode } from 'react';
import clsx from 'classnames';

import { Text } from '../../../shared/text';

type SummaryCardProps = {
    header: ReactNode;
    children: ReactNode;
    initialExpanded?: boolean;
};

export function SummaryCard({
    children,
    header,
    initialExpanded = false,
}: SummaryCardProps) {
    const [expanded, setExpanded] = useState(initialExpanded);

    return (
        <div
            className={clsx(
                'border border-solid rounded-2xl overflow-hidden',
                expanded ? 'border-gray-45' : 'border-gray-40'
            )}
        >
            <button
                onClick={() => setExpanded((expanded) => !expanded)}
                className="bg-gray-40 px-4 py-3 flex w-full cursor-pointer border-none relative"
            >
                <Text
                    variant="captionSmall"
                    weight="semibold"
                    color="steel-darker"
                >
                    {header}
                </Text>

                <div className="absolute right-4 top-3 text-steel">
                    {expanded ? <ChevronDown16 /> : <ChevronRight16 />}
                </div>
            </button>
            {expanded && <div className="px-4 py-3">{children}</div>}
        </div>
    );
}
