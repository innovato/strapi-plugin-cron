import { Box, Typography } from '@strapi/design-system';
import { Page } from '@strapi/strapi/admin';
import { useQuery } from '@tanstack/react-query';
import 'prismjs/themes/prism.css';
import { useLocation } from 'react-router-dom';
import { cronApi } from '../api/cron';
import { CodeField } from '../components/CodeField';
import { ContentBlock } from '../components/ContentBlock';
import { CronJobFormView } from '../components/CronJobForm';
import { DataField } from '../components/DataField';
import { NotFound } from '../components/NotFound';
import { PageLayout } from '../components/PageLayout';
import { getDateAndTimeString } from '../utils/date';

export const ViewCronJobPage: React.FunctionComponent = () => {
  const location = useLocation();
  const documentId = location.pathname.split('/').at(-1) as string;
  const { isPending, data: cronJob } = useQuery({
    queryKey: ['cronJob', documentId],
    queryFn: () => cronApi.getCronJob(documentId),
  });

  if (isPending) return <Page.Loading />;

  if (!cronJob) return <NotFound />;

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
        <CodeField
          value={cronJob.latestExecutionLog?.map((line) => line.join(' ')).join('\n') ?? ''}
          onValueChange={() => {}}
        />
      </ContentBlock>
    </PageLayout>
  );
};
