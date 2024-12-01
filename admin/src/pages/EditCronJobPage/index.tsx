import React from 'react';

import { CronJob } from '../../../../types';
import { cron } from '../../api/cron';
import { CronJobForm } from '../../components/CronJobForm';
import { NotFound } from '../../components/NotFound';
import { GoBackButton } from '../../components/go-back-button';
import { getResponseErrors } from '../../utils/getResponseErrors';
import { pluginBasePath } from '../../utils/plugin';

import { useLocation, useNavigate } from 'react-router-dom';

export const EditCronJobPage: React.FunctionComponent = () => {
  // Explicitly cast the state to include the CronJob type
  const location = useLocation();
  const state = location.state as { cronJob: CronJob } | undefined;
  const cronJob = state?.cronJob;

  const navigate = useNavigate();

  if (!cronJob) {
    return <NotFound />;
  }

  async function handleFormSubmit({ input, setErrors }: { input: any; setErrors: (errors: any) => void }) {
    try {
      await cron.updateCronJob(cronJob.id, input);
      navigate(pluginBasePath); // Replaces history.push
    } catch (error: any) {
      const errors = getResponseErrors(error.response);
      setErrors(errors);
    }
  }

  return (
    <>
      <CronJobForm initialData={cronJob} handleSubmit={handleFormSubmit} />
    </>
  );
};
