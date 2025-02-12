import { Box, Typography } from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';
import { useLocation } from 'react-router-dom';
import { CronJob } from '../../../types';
import { cron } from '../api/cron';
import { ContentBlock } from '../components/ContentBlock';
import { CronJobFormView } from '../components/CronJobForm';
import { DataField } from '../components/DataField';
import { NotFound } from '../components/NotFound';
import { PageLayout } from '../components/PageLayout';
import { getDateAndTimeString } from '../utils/date';

type Props = {
  match?: {
    params: { id: number };
  };
};

export const ViewCronJobPage: React.FunctionComponent<Props> = ({ match }) => {
  const location = useLocation();
  const [cronJob, setCronJob] = useState<CronJob>(location.state?.cronJob);

  useEffect(() => {
    fetchCronJob();
  }, []);

  if (!cronJob) {
    return <NotFound />;
  }

  async function fetchCronJob() {
    const { data } = await cron.getCronJob(cronJob.documentId);
    setCronJob(data);
  }

  const executionLog = cronJob.latestExecutionLog?.map((line) => line.join(' ')).join('\n') ?? '';

  return (
    <PageLayout title={cronJob.name}>
      <ContentBlock>
        <CronJobFormView data={cronJob} />
        <Box marginBottom={8} marginTop={8}>
          <Typography variant="beta">Metadata</Typography>
        </Box>
        <DataField label="Iterations count" value={cronJob.iterationsCount.toString()} />
        <DataField
          label="Created at"
          value={getDateAndTimeString(cronJob.createdAt)}
          type={'date'}
        />
        <DataField
          label="Updated at"
          value={getDateAndTimeString(cronJob.updatedAt)}
          type={'date'}
        />
        <DataField
          label="Published at"
          value={getDateAndTimeString(cronJob.publishedAt)}
          type={'date'}
        />
        <DataField label="Document ID" value={cronJob.documentId} />

        <Box marginBottom={8} marginTop={8}>
          <Typography variant="beta">Latest execution log</Typography>
        </Box>
        <CodeBlock
          customStyle={{ fontSize: '14px' }}
          text={executionLog}
          theme={dracula}
          language="text"
        />
      </ContentBlock>
    </PageLayout>
  );
};
