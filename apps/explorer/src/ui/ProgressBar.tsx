// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
export interface ProgressBarProps {
    progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="w-full rounded-full bg-gray-45">
            <div
                className="rounded-full bg-success py-1 transition-all"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
