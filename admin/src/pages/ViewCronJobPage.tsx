import { Box, Typography } from '@strapi/design-system';
import { Page } from '@strapi/strapi/admin';
import 'prismjs/themes/prism.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CronJob } from '../../../types';
import { cron } from '../api/cron';
import { CodeField } from '../components/CodeField';
import { ContentBlock } from '../components/ContentBlock';
import { CronJobFormView } from '../components/CronJobForm';
import { DataField } from '../components/DataField';
import { NotFound } from '../components/NotFound';
import { PageLayout } from '../components/PageLayout';
import { getDateAndTimeString } from '../utils/date';

export const ViewCronJobPage: React.FunctionComponent = () => {
  const location = useLocation();
  const documentId = location.pathname.split('/').at(-1);
  const [cronJob, setCronJob] = useState<CronJob>();

  useEffect(() => {
    if (documentId)
      cron.getCronJob(documentId).then(({ data }) => {
        setCronJob(data);
      });
  }, []);

  if (!documentId) return <NotFound />;

  if (!cronJob) return <Page.Loading />;

  const executionLog = cronJob.latestExecutionLog?.map((line) => line.join(' ')).join('\n') ?? '';

  return (
    <PageLayout title={cronJob.name}>
      <ContentBlock>
        <CronJobFormView data={cronJob} />
        <Box marginBottom={8} marginTop={8}>
          <Typography variant="beta">Metadata</Typography>
        </Box>
        <DataField
          label="Iterations count"
          value={`${cronJob.iterationsCount} / ${cronJob.iterationsLimit}`}
        />
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
          value={getDateAndTimeString(cronJob.publicationDate)}
          type={'date'}
        />
        <DataField label="Document ID" value={cronJob.documentId} />

        <Box marginBottom={8} marginTop={8}>
          <Typography variant="beta">Latest execution log</Typography>
        </Box>
        <CodeField value={executionLog} onValueChange={() => {}} />
      </ContentBlock>
    </PageLayout>
  );
};
