import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJobInputData, CronJobInputErrors } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cron } from '../api/cron';
import { BaseHeaderLayout } from '../components/BaseHeaderLayout';
import { ContentLayout } from '../components/ContentLayout';
import { CronJobForm } from '../components/CronJobForm';
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
      // TODO
      setErrors(errors as any);
    }
  }

  return (
    <>
      <BaseHeaderLayout
        title="New cron job"
        // navigationAction={<GoBackButton />}
      />
      <ContentLayout>
        <CronJobForm handleSubmit={handleFormSubmit} />
      </ContentLayout>
    </>
  );
};
