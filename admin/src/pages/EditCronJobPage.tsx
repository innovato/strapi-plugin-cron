import { Page } from '@strapi/strapi/admin';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CronJob, CronJobInputData, CronJobInputErrors } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cron } from '../api/cron';
import { ContentBlock } from '../components/ContentBlock';
import { CronJobForm } from '../components/CronJobForm';
import { NotFound } from '../components/NotFound';
import { PageLayout } from '../components/PageLayout';
import { getResponseErrors } from '../utils/getResponseErrors';

export const EditCronJobPage: React.FunctionComponent = () => {
  const location = useLocation();
  const documentId = location.pathname.split('/').at(-1);
  const navigate = useNavigate();
  const [cronJob, setCronJob] = useState<CronJob>();

  useEffect(() => {
    if (documentId)
      cron.getCronJob(documentId).then(({ data }) => {
        setCronJob(data);
      });
  }, []);

  if (!documentId) return <NotFound />;

  if (!cronJob) return <Page.Loading />;

  async function handleFormSubmit({
    input,
    setErrors,
  }: {
    input: CronJobInputData;
    setErrors: (errors: CronJobInputErrors) => void;
  }) {
    try {
      if (documentId) await cron.updateCronJob(documentId, input);
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
