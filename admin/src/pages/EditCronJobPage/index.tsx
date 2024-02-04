import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CronJob } from "../../../../types";
import { cron } from "../../api/cron";
import { CronJobForm } from "../../components/CronJobForm";
import { NotFound } from "../../components/NotFound";
import { GoBackButton } from "../../components/go-back-button";
import { getResponseErrors } from "../../utils/getResponseErrors";
import { pluginBasePath } from "../../utils/plugin";

export const EditCronJobPage: React.FunctionComponent = () => {
  const location = useLocation<{cronJob: CronJob}>();
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
      <BaseHeaderLayout title="Edit cron job" as="h2" navigationAction={<GoBackButton />} />
      <ContentLayout>
        <CronJobForm initialData={cronJob} handleSubmit={handleFormSubmit} />
      </ContentLayout>
    </>
  );
};
