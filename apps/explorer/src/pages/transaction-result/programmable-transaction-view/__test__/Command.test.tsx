// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { RpcClientContext } from '../../../../../../core';

import {
    Command,
    CommandType,
} from '~/pages/transaction-result/programmable-transaction-view/Command';
import { DefaultRpcClient, Network } from '~/utils/api/DefaultRpcClient';

describe('Command', () => {
    it('should render default fallback when type is unknown', () => {
        const unknownType = 'unknown' as CommandType;
        const { getByTestId } = render(
            <Command type={unknownType} data={['GasCoin', { Input: 1 }]} />
        );
        const label = getByTestId('programmable-transactions-command-label');
        const content = getByTestId(
            'programmable-transactions-command-content'
        );
        expect(label.textContent).toBe(unknownType);
        expect(content.textContent).toBe('(GasCoin, {"Input":1})');
    });

    it('should render SplitCoin', () => {
        const { getByTestId } = render(
            <Command
                type={CommandType.SplitCoin}
                data={['GasCoin', { Input: 1 }]}
            />
        );
        const label = getByTestId('programmable-transactions-command-label');
        const content = getByTestId(
            'programmable-transactions-command-content'
        );
        expect(label.textContent).toBe(CommandType.SplitCoin);
        expect(content.textContent).toBe('(GasCoin, Input(1))');
    });

    it('should render TransferObjects', () => {
        const { getByTestId } = render(
            <Command
                type={CommandType.TransferObjects}
                data={[
                    [
                        {
                            Result: 0,
                        },
                        {
                            Result: 1,
                        },
                        {
                            Result: 2,
                        },
                        {
                            Result: 3,
                        },
                        {
                            Result: 4,
                        },
                    ],
                    {
                        Input: 0,
                    },
                ]}
            />
        );
        const label = getByTestId('programmable-transactions-command-label');
        const content = getByTestId(
            'programmable-transactions-command-content'
        );
        expect(label.textContent).toBe(CommandType.TransferObjects);
        expect(content.textContent).toBe(
            '([Result(0), Result(1), Result(2), Result(3), Result(4)], Input(0))'
        );
    });

    it('should render MergeCoins', () => {
        const { getByTestId } = render(
            <Command
                type={CommandType.MergeCoins}
                data={[
                    {
                        Input: 0,
                    },
                    [
                        {
                            Result: 0,
                        },
                        {
                            Result: 1,
                        },
                        {
                            Result: 2,
                        },
                        {
                            Result: 3,
                        },
                        {
                            Result: 4,
                        },
                    ],
                ]}
            />
        );
        const label = getByTestId('programmable-transactions-command-label');
        const content = getByTestId(
            'programmable-transactions-command-content'
        );
        expect(label.textContent).toBe(CommandType.MergeCoins);
        expect(content.textContent).toBe(
            '(Input(0), [Result(0), Result(1), Result(2), Result(3), Result(4)])'
        );
    });

    it('should render MakeMoveVec', () => {
        const { getByTestId } = render(
            <Command
                type={CommandType.MakeMoveVec}
                data={[
                    [
                        {
                            Result: 0,
                        },
                        {
                            Result: 1,
                        },
                        {
                            Result: 2,
                        },
                        {
                            Result: 3,
                        },
                        {
                            Result: 4,
                        },
                    ],
                ]}
            />
        );
        const label = getByTestId('programmable-transactions-command-label');
        const content = getByTestId(
            'programmable-transactions-command-content'
        );
        expect(label.textContent).toBe(CommandType.MakeMoveVec);
        expect(content.textContent).toBe(
            '([Result(0), Result(1), Result(2), Result(3), Result(4)])'
        );
    });

    it('should render MoveCall', () => {
        const { getByTestId } = render(
            <QueryClientProvider client={new QueryClient()}>
                <BrowserRouter>
                    <RpcClientContext.Provider
                        value={DefaultRpcClient(Network.LOCAL)}
                    >
                        <Command
                            type={CommandType.MoveCall}
                            data={{
                                package:
                                    '0xb17c941e827d5d0e9c94ec40fedd7f3b50b505c397fff50c605ee82eeb45ab04',
                                module: 'serializer_tests',
                                function: 'value',
                                arguments: [
                                    {
                                        Input: 0,
                                    },
                                ],
                            }}
                        />
                    </RpcClientContext.Provider>
                </BrowserRouter>
            </QueryClientProvider>
        );
        const label = getByTestId('programmable-transactions-command-label');
        const content = getByTestId(
            'programmable-transactions-command-content'
        );
        expect(label.textContent).toBe(CommandType.MoveCall);
        expect(content.textContent).toBe(
            "(package: 0xb17c…ab04, module: serializer_tests, function: 'value', arguments: [Input(0)])"
        );
    });
});
