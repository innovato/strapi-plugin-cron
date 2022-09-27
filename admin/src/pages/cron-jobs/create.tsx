import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import React from "react";

export const NewCronJobPage: React.FunctionComponent = () => {
  return (
    <>
      <BaseHeaderLayout title="New Cron Job" as="h2" />
      <ContentLayout>New Cron Job</ContentLayout>
    </>
  );
};
