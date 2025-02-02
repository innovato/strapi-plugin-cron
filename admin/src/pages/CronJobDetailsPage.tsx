import { Box, Divider, Grid, Typography } from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';
import { useLocation } from 'react-router-dom';
import { CronJob } from '../../../types';
import { cron } from '../api/cron';
import { BaseHeaderLayout } from '../components/BaseHeaderLayout';
import { ContentLayout } from '../components/ContentLayout';
import { GoBackButton } from '../components/GoBackButton';
import { NotFound } from '../components/NotFound';
import { getReadableDate } from '../utils/date';

type Props = {
  match?: {
    params: { id: number };
  };
};

export const CronJobDetailsPage: React.FunctionComponent<Props> = ({ match }) => {
  const location = useLocation();
  const [cronJob, setCronJob] = useState<CronJob>(location.state?.cronJob);

  useEffect(() => {
    fetchCronJob();
  }, []);

  if (!cronJob) {
    return <NotFound />;
  }

  async function fetchCronJob() {
    const { data } = await cron.getCronJob(cronJob.id);
    setCronJob(data);
  }

  const executionLog = cronJob.latestExecutionLog?.map((line) => line.join(' ')).join('\n') ?? '';

  const PropRow = ({ name, value }: { name: string; value: string }) => (
    <>
      <Grid.Item col={2}>
        <Box>
          <Typography variant="epsilon">{name}</Typography>
        </Box>
      </Grid.Item>
      <Grid.Item col={4}>
        <Box>
          <Typography variant="epsilon">{value}</Typography>
        </Box>
      </Grid.Item>
      <Grid.Item col={6} paddingTop={3} paddingBottom={3}>
        <Divider />
      </Grid.Item>
    </>
  );

  const iterations =
    cronJob.iterationsLimit === -1
      ? '∞'
      : `${cronJob.iterationsCount} / ${cronJob.iterationsLimit}`;

  return (
    <>
      <BaseHeaderLayout title={cronJob?.name ?? ''} navigationAction={<GoBackButton />} />
      <ContentLayout>
        <Box
          padding={8}
          marginBottom={8}
          borderStyle={'solid'}
          borderWidth={'1px'}
          borderColor={'neutral150'}
          borderRadius={'4px'}
          shadow="tableShadow"
          background="neutral0"
        >
          <Box>
            <Grid.Root gap={1} gridCols={6}>
              <PropRow name="Published at" value={getReadableDate(cronJob.publishedAt) || '—'} />
              <PropRow name="Schedule" value={cronJob.schedule} />

              <PropRow name="Start date" value={getReadableDate(cronJob.startDate) || '—'} />
              <PropRow name="End date" value={getReadableDate(cronJob.endDate) || '—'} />
              <PropRow name="Iterations" value={iterations} />
              <Grid.Item col={6}>
                <Box paddingTop={6} paddingBottom={2}>
                  <Typography variant="epsilon">Latest execution log</Typography>
                </Box>
                <CodeBlock text={executionLog} theme={dracula} language="text" />
              </Grid.Item>
            </Grid.Root>
          </Box>
        </Box>
      </ContentLayout>
    </>
  );
};
