import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CronJobInputData, CronJobInputErrors } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cron } from '../api/cron';
import { ContentBlock } from '../components/ContentBlock';
import { CronJobForm } from '../components/CronJobForm';
import { NotFound } from '../components/NotFound';
import { PageLayout } from '../components/PageLayout';
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
      await cron.updateCronJob(cronJob.documentId, input);
      navigate(pluginBasePath);
    } catch (error: any) {
      const errors = getResponseErrors(error.response);
      setErrors(errors);
    }
  }

  return (
    <PageLayout title={'Edit Cron Cob'}>
      <ContentBlock>
        <CronJobForm initialData={cronJob} handleSubmit={handleFormSubmit} />
      </ContentBlock>
    </PageLayout>
  );
};
