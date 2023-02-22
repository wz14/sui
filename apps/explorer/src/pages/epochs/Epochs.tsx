// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { useFeature, FeaturesReady } from '@growthbook/growthbook-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

import { getEpochs } from './mocks';

import { SuiAmount } from '~/components/transaction-card/TxCardUtils';
import { TxTimeType } from '~/components/tx-time/TxTimeType';
import { LoadingSpinner } from '~/ui/LoadingSpinner';
import { PlaceholderTable } from '~/ui/PlaceholderTable';
import { TableCard } from '~/ui/TableCard';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '~/ui/Tabs';
import { GROWTHBOOK_FEATURES } from '~/utils/growthbook';

function Epochs() {
    const enabled = useFeature(GROWTHBOOK_FEATURES.EPOCHS_CHECKPOINTS).on;
    console.log(enabled);
    // todo: replace this with real endpoint when available
    const { data: epochData } = useQuery(
        ['epochs'],
        async () => await getEpochs()
    );

    const tableData = useMemo(
        () =>
            epochData
                ? {
                      data: epochData?.map((epoch) => ({
                          time: <TxTimeType timestamp={epoch.timestamp} />,
                          epoch: epoch.epoch,
                          transactions: epoch.transaction_count,
                          stakeRewards: (
                              <SuiAmount amount={epoch.total_stake_rewards} />
                          ),
                          storageRevenue: (
                              <SuiAmount
                                  amount={
                                      BigInt(epoch.storage_fund_inflows) -
                                      BigInt(epoch.storage_fund_outflows)
                                  }
                              />
                          ),
                      })),
                      columns: [
                          { header: 'Time', accessorKey: 'time' },
                          { header: 'Epoch', accessorKey: 'epoch' },
                          {
                              header: 'Transactions',
                              accessorKey: 'transactions',
                          },
                          {
                              header: 'Stake Rewards',
                              accessorKey: 'stakeRewards',
                          },
                          {
                              header: 'Storage Revenue',
                              accessorKey: 'storageRevenue',
                          },
                      ],
                  }
                : null,
        [epochData]
    );

    if (!enabled) return <Navigate to="/" />;

    return (
        <div>
            <TabGroup size="lg">
                <TabList>
                    <Tab>Epochs</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {tableData ? (
                            <TableCard
                                data={tableData.data}
                                columns={tableData.columns}
                            />
                        ) : (
                            <PlaceholderTable
                                rowCount={20}
                                rowHeight="13px"
                                colHeadings={['time', 'number']}
                                colWidths={['50%', '50%']}
                            />
                        )}
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
}

export default () => (
    <FeaturesReady timeout={500} fallback={<LoadingSpinner />}>
        <Epochs />
    </FeaturesReady>
);
