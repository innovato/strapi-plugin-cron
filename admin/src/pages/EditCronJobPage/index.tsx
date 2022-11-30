import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { cron } from "../../api/cron";
import { CronJobForm } from "../../components/CronJobForm";
import { NotFound } from "../../components/NotFound";
import { getResponseErrors } from "../../utils/getResponseErrors";
import { pluginBasePath } from "../../utils/plugin";

export const EditCronJobPage: React.FunctionComponent = () => {
  const location = useLocation();
  const cronJob = location.state?.cronJob;
  const history = useHistory();

  if (!cronJob) {
    return <NotFound />;
  }

  async function handleFormSubmit({ input, setErrors }) {
    try {
      await cron.updateCronJob(cronJob.id, input);
      history.push(pluginBasePath);
    } catch (error) {
      const errors = getResponseErrors(error.response);
      setErrors(errors);
    }
  }

  return (
    <>
      <BaseHeaderLayout title="Edit cron job" as="h2" />
      <ContentLayout>
        <CronJobForm initialData={cronJob} handleSubmit={handleFormSubmit} />
      </ContentLayout>
    </>
  );
};
