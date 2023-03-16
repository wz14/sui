// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ChevronDown12, ChevronRight12 } from '@mysten/icons';
import { CommandArgument, TransactionCommand } from '@mysten/sui.js';
import { useState } from 'react';
import { Text } from '_src/ui/app/shared/text';

function convertCommandArgumentToString(
    arg: string | string[] | CommandArgument | CommandArgument[]
): string {
    if (typeof arg === 'string') return arg;

    if (Array.isArray(arg)) {
        return `[${arg
            .map((argVal) => convertCommandArgumentToString(argVal))
            .join(', ')}]`;
    }

    switch (arg.kind) {
        case 'GasCoin':
            return 'GasCoin';
        case 'Input':
            return `Input(${arg.index})`;
        case 'Result':
            return `Result(${arg.index})`;
        case 'NestedResult':
            return `NestedResult(${arg.index}, ${arg.resultIndex})`;
        default:
            console.warn(arg);
            throw new Error('Not able to parse command argument');
    }
}

function convertCommandToString({ kind, ...command }: TransactionCommand) {
    const commandArguments = Object.entries(command);

    return commandArguments
        .map(
            ([key, value]) => `${key}: ${convertCommandArgumentToString(value)}`
        )
        .join(', ');
}

export function Command({ command }: { command: TransactionCommand }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div>
            <div
                role="button"
                onClick={() => setExpanded((expanded) => !expanded)}
                className="flex items-center gap-2"
            >
                <Text variant="body" weight="semibold" color="steel-darker">
                    {command.kind}
                </Text>
                <div className="h-px bg-gray-40 flex-1" />
                <div className="text-steel">
                    {expanded ? <ChevronDown12 /> : <ChevronRight12 />}
                </div>
            </div>

            {expanded && (
                <div className="mt-2 text-p2 font-medium text-steel">
                    ({convertCommandToString(command)})
                </div>
            )}
        </div>
    );
}
