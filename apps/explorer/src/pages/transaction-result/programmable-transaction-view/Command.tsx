// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    getMovePackageContent,
    type MoveCallSuiCommand,
    type SuiArgument,
    type SuiMovePackage,
} from '@mysten/sui.js';
import { type ReactNode } from 'react';

import ModuleView from '~/components/module/ModuleView';
import {
    flattenSuiArguments,
    stringifyCommandData,
} from '~/pages/transaction-result/programmable-transaction-view/utils';
import { ModuleLink, ObjectLink } from '~/ui/InternalLink';

export interface ICommandProps<T> {
    type: string;
    data: T;
}

export enum CommandType {
    SplitCoin = 'SplitCoin',
    MergeCoins = 'MergeCoins',
    TransferObjects = 'TransferObjects',
    MoveCall = 'MoveCall',
    Publish = 'Publish',
    MakeMoveVec = 'MakeMoveVec',
}

function CommandContent({
    type,
    children,
}: {
    type: string;
    children: ReactNode;
}) {
    return (
        <>
            <div
                data-testid="programmable-transactions-command-label"
                className="text-heading6 font-semibold text-steel-darker"
            >
                {type}
            </div>
            <div
                data-testid="programmable-transactions-command-content"
                className="text-bodyMedium pt-2 text-steel"
            >
                {children}
            </div>
        </>
    );
}

function SplitMergeTransferMakeMoveVec({
    type,
    data,
}: ICommandProps<(SuiArgument | SuiArgument[])[]>) {
    return (
        <CommandContent type={type}>
            ({flattenSuiArguments(data)})
        </CommandContent>
    );
}

function MoveCall({ type, data }: ICommandProps<MoveCallSuiCommand>) {
    const {
        module,
        package: movePackage,
        function: func,
        arguments: args,
    } = data;
    return (
        <CommandContent type={type}>
            (package: <ObjectLink objectId={movePackage} />, module:&nbsp;
            <ModuleLink
                objectId={movePackage}
                moduleId={module}
                label={module}
            />
            , function:&nbsp;
            <span className="text-hero-dark">&#39;{func}&#39;</span>, arguments:
            [{flattenSuiArguments(args!)}])
        </CommandContent>
    );
}

function Publish({ type, data }: ICommandProps<SuiMovePackage>) {
    const movePackageData = getMovePackageContent(data);

    const key = Object.keys(movePackageData!)[0];
    const code = movePackageData![key];

    return (
        <CommandContent type={type}>
            <ModuleView name={key} code={code} />
        </CommandContent>
    );
}

export function Command({
    type,
    data,
}: ICommandProps<
    (SuiArgument | SuiArgument[])[] | MoveCallSuiCommand | SuiMovePackage
>) {
    switch (type) {
        case CommandType.SplitCoin:
        case CommandType.MergeCoins:
        case CommandType.TransferObjects:
        case CommandType.MakeMoveVec:
            if (Array.isArray(data)) {
                return (
                    <SplitMergeTransferMakeMoveVec type={type} data={data} />
                );
            }
            break;
        case CommandType.MoveCall:
            return <MoveCall type={type} data={data as MoveCallSuiCommand} />;
        case CommandType.Publish:
            return <Publish type={type} data={data as SuiMovePackage} />;
        default:
            break;
    }

    return (
        <CommandContent type={type}>
            ({stringifyCommandData(data)})
        </CommandContent>
    );
}
