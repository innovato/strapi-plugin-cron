import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob, CronJobInputData } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cronApi } from '../api/cron';
import { ContentBlock } from '../components/ContentBlock';
import { CronJobForm } from '../components/CronJobForm';
import { PageLayout } from '../components/PageLayout';

export const NewCronJobPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: cronApi.createNewCronJob,
    onSuccess: (cronJob: CronJob) => {
      navigate(pluginBasePath);
    },
  });

  return (
    <PageLayout title="New Cron Cob">
      <ContentBlock>
        <CronJobForm handleSubmit={(data: CronJobInputData) => mutation.mutateAsync(data)} />
      </ContentBlock>
    </PageLayout>
  );
};
