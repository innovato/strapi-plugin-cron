import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import React from "react";
import { CronJobForm } from "../../components/CronJobForm";

export const NewCronJobPage: React.FunctionComponent = () => {
  return (
    <>
      <BaseHeaderLayout title="New Cron Job" as="h2" />
      <ContentLayout>
        <Box padding={8} background="neutral0">
          <CronJobForm />
        </Box>
      </ContentLayout>
    </>
  );
};
