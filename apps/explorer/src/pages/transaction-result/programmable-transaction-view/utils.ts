// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { type SuiArgument } from '@mysten/sui.js';

export const stringifyCommandData = (commandData: any): string => {
    if (Array.isArray(commandData)) {
        return commandData
            .map((data: any) => {
                if (typeof data === 'object') {
                    return JSON.stringify(data);
                }
                return data;
            })
            .join(', ');
    }
    return JSON.stringify(commandData);
};

export function flattenSuiArguments(
    data: (SuiArgument | SuiArgument[])[]
): string {
    if (!data) {
        return '';
    }

    const res = [];
    for (const value of data) {
        if (typeof value === 'string') {
            res.push(value);
        } else if (Array.isArray(value)) {
            res.push(`[${flattenSuiArguments(value)}]`);
        } else if (typeof value === 'object') {
            const key = Object.keys(value)[0];
            const valueProp = value[key as keyof typeof value];
            if (Array.isArray(valueProp)) {
                res.push(`${key}(${valueProp[0]}, ${valueProp[1]})`);
            } else {
                res.push(`${key}(${valueProp})`);
            }
        } else {
            console.warn(value);
            throw new Error('Not a correct flattenable data');
        }
    }

    return res.join(', ');
}
