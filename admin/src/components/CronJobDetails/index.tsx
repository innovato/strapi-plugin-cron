import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import React, { useEffect, useState } from "react";
import { CronJob } from "../../../../types";
import { cron } from "../../api/cron";

type Props = {
  match: {
    params: { id: number };
  };
};

export const CronJobDetails: React.FunctionComponent<Props> = ({ match }) => {
  const [cronJob, setCronJob] = useState<CronJob>();

  useEffect(() => {
    fetchCronJob();
  }, []);

  async function fetchCronJob() {
    const { data } = await cron.getCronJob(match.params.id);
    setCronJob(data);
  }

  return (
    <>
      <BaseHeaderLayout title={cronJob?.name ?? ""} as="h2" />
      <ContentLayout>
        <></>
      </ContentLayout>
    </>
  );
};
