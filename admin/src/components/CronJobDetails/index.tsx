import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import React from "react";

type Props = {};

export const CronJobDetails: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <BaseHeaderLayout title="<Cron Job Name>" as="h2" />
      <ContentLayout>
        <></>
      </ContentLayout>
    </>
  );
};
