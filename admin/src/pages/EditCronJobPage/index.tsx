import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { cron } from "../../api/cron";
import { CronJobForm } from "../../components/CronJobForm";
import { getResponseErrors } from "../../utils/getResponseErrors";
import { pluginBasePath } from "../../utils/plugin";

export const EditCronJobPage: React.FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();

  async function handleFormSubmit({ input, setErrors }) {
    try {
      await cron.updateCronJob(location.state?.cronJob.id, input);
      history.push(pluginBasePath);
    } catch (error) {
      const errors = getResponseErrors(error.response);
      setErrors(errors);
    }
  }

  return (
    <>
      <BaseHeaderLayout title="Edit Cron Job" as="h2" />
      <ContentLayout>
        <CronJobForm
          initialData={location.state?.cronJob}
          handleSubmit={handleFormSubmit}
        />
      </ContentLayout>
    </>
  );
};
