import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJobInputData, CronJobInputErrors } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cron } from '../api/cron';
import { ContentBlock } from '../components/ContentBlock';
import { CronJobForm } from '../components/CronJobForm';
import { PageLayout } from '../components/PageLayout';
import { getResponseErrors } from '../utils/getResponseErrors';

export const NewCronJobPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  async function handleFormSubmit({
    input,
    setErrors,
  }: {
    input: CronJobInputData;
    setErrors: (errors: CronJobInputErrors) => void;
  }) {
    try {
      await cron.createNewCronJob(input);
      navigate(pluginBasePath);
    } catch (error: any) {
      const errors = getResponseErrors(error.response);
      setErrors(errors);
    }
  }

  return (
    <PageLayout title="New Cron Cob">
      <ContentBlock>
        <CronJobForm handleSubmit={handleFormSubmit} />
      </ContentBlock>
    </PageLayout>
  );
};
