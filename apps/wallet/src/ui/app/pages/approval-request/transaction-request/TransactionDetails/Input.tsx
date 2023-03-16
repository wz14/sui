// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { BuilderCallArg, is, toB64, TransactionInput } from '@mysten/sui.js';
import { Text } from '_src/ui/app/shared/text';

export function Input({ input }: { input: TransactionInput }) {
    return (
        <div>
            <div role="button" className="flex items-center gap-2">
                <Text variant="body" weight="semibold" color="steel-darker">
                    {is(input.value, BuilderCallArg)
                        ? 'Pure' in input.value
                            ? `Bytes: ${toB64(
                                  new Uint8Array(input.value.Pure)
                              )}`
                            : 'ImmOrOwned' in input.value.Object
                            ? `Object: ${input.value.Object.ImmOrOwned.objectId}`
                            : `Shared Object: ${input.value.Object.Shared.objectId}`
                        : 'Unknown input value'}
                </Text>
            </div>
        </div>
    );
}
