import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import React from "react";
import { useHistory } from "react-router-dom";
import { cron } from "../../api/cron";
import { CronJobForm } from "../../components/CronJobForm";
import { getResponseErrors } from "../../utils/getResponseErrors";
import { pluginBasePath } from "../../utils/plugin";

export const NewCronJobPage: React.FunctionComponent = () => {
  const history = useHistory();

  async function handleFormSubmit({ input, setErrors }) {
    try {
      await cron.createNewCronJob(input);
      history.push(pluginBasePath);
    } catch (error) {
      const errors = getResponseErrors(error.response);
      setErrors(errors);
    }
  }

  return (
    <>
      <BaseHeaderLayout title="New cron job" as="h2" />
      <ContentLayout>
        <CronJobForm handleSubmit={handleFormSubmit} />
      </ContentLayout>
    </>
  );
};
