// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { formatAddress, formatDigest } from '@mysten/sui.js';

import { Link, type LinkProps } from '~/ui/Link';

interface BaseInternalLinkProps extends LinkProps {
    noTruncate?: boolean;
    label?: string;
}

function createInternalLink<T extends string>(
    base: string,
    propName: T,
    formatter = formatAddress,
    moduleId?: T
) {
    return ({
        [propName]: id,
        [moduleId || '']: moduleIdLink,
        noTruncate,
        label,
        ...props
    }: BaseInternalLinkProps & Record<T, string>) => {
        const truncatedAddress = noTruncate ? id : formatter(id);
        const to = moduleIdLink ? `${id}?module=${moduleIdLink}` : id;
        return (
            <Link variant="mono" to={`/${base}/${encodeURI(to)}`} {...props}>
                {label || truncatedAddress}
            </Link>
        );
    };
}

export const AddressLink = createInternalLink('address', 'address');
export const ObjectLink = createInternalLink('object', 'objectId');
export const TransactionLink = createInternalLink(
    'transaction',
    'digest',
    formatDigest
);
export const ValidatorLink = createInternalLink('validator', 'address');
export const ModuleLink = createInternalLink(
    'object',
    'objectId',
    formatAddress,
    'moduleId'
);
