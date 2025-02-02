import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CronJobInputData, CronJobInputErrors } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cron } from '../api/cron';
import { BaseHeaderLayout } from '../components/BaseHeaderLayout';
import { ContentLayout } from '../components/ContentLayout';
import { CronJobForm } from '../components/CronJobForm';
import { GoBackButton } from '../components/GoBackButton';
import { NotFound } from '../components/NotFound';
import { getResponseErrors } from '../utils/getResponseErrors';

export const EditCronJobPage: React.FunctionComponent = () => {
  const location = useLocation();
  const cronJob = location.state?.cronJob;
  const navigate = useNavigate();

  if (!cronJob) {
    return <NotFound />;
  }

  async function handleFormSubmit({
    input,
    setErrors,
  }: {
    input: CronJobInputData;
    setErrors: (errors: CronJobInputErrors) => void;
  }) {
    try {
      await cron.updateCronJob(cronJob.id, input);
      navigate(pluginBasePath);
    } catch (error: any) {
      const errors = getResponseErrors(error.response);
      // TODO
      setErrors(errors as any);
    }
  }

  return (
    <>
      <BaseHeaderLayout title="Edit cron job" navigationAction={<GoBackButton />} />
      <ContentLayout>
        <CronJobForm initialData={cronJob} handleSubmit={handleFormSubmit} />
      </ContentLayout>
    </>
  );
};
