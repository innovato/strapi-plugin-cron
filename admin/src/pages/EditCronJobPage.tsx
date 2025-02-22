import { Page } from '@strapi/strapi/admin';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CronJob, CronJobInputData } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cronApi } from '../api/cron';
import { ContentBlock } from '../components/ContentBlock';
import { CronJobForm } from '../components/CronJobForm';
import { NotFound } from '../components/NotFound';
import { PageLayout } from '../components/PageLayout';

export const EditCronJobPage: React.FunctionComponent = () => {
  const location = useLocation();
  const documentId = location.pathname.split('/').at(-1) as string;
  const navigate = useNavigate();
  const { isPending, data: cronJob } = useQuery({
    queryKey: ['cronJob', documentId],
    queryFn: () => cronApi.getCronJob(documentId),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: cronApi.updateCronJob,
    onSuccess: (cronJob: CronJob) => {
      queryClient.invalidateQueries({ queryKey: ['cronJob', documentId] });
      navigate(pluginBasePath);
    },
  });

  if (isPending) return <Page.Loading />;

  if (!cronJob) return <NotFound />;

  return (
    <PageLayout title={'Edit Cron Cob'}>
      <ContentBlock>
        <CronJobForm
          initialData={cronJob}
          handleSubmit={(data: CronJobInputData) => mutation.mutateAsync({ documentId, data })}
        />
      </ContentBlock>
    </PageLayout>
  );
};
