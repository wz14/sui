// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { type SuiJsonValue, toB64 } from '@mysten/sui.js';

import { AddressOrObject } from '~/pages/transaction-result/programmable-transaction-view/AddressOrObject';
import { TableHeader } from '~/ui/TableHeader';

interface Props {
    inputs: SuiJsonValue[];
}

export function Inputs({ inputs }: Props) {
    if (!inputs?.length) {
        return null;
    }

    return (
        <div data-testid="programmable-transactions-inputs" className="mt-8">
            <section className="pt-4 pb-4">
                <TableHeader>Inputs</TableHeader>
                <ul className="flex flex-col gap-y-3">
                    {inputs.map((input) => {
                        if (Array.isArray(input)) {
                            const readableInput = toB64(
                                Uint8Array.from(
                                    input.map((val) => Number(val || 0))
                                )
                            );

                            return (
                                <li key={readableInput}>
                                    <div className="mt-1 text-bodySmall font-medium text-steel-dark">
                                        {readableInput}
                                    </div>
                                </li>
                            );
                        }

                        // TODO: This needs to be fixed once we have better way to tell between object and address IDs
                        return (
                            <li key={String(input)}>
                                <AddressOrObject id={String(input)} />
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
}
