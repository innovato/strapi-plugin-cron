import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import EmptyDocuments from "@strapi/icons/EmptyDocuments";
import React, { useEffect, useState } from "react";
import { cron } from "../../api/cron";
import CronJobsTable from "../../components/CronJobsTable";

const HomePage: React.FunctionComponent = () => {
  const [cronJobs, setCronJobs] = useState([]);

  useEffect(() => {
    cron.getAllCronJobs().then((res) => {
      setCronJobs(res.data);
    });
  }, []);

  return (
    <>
      <BaseHeaderLayout title="Cron Jobs" as="h2" />
      <ContentLayout>
        {cronJobs.length === 0 ? (
          <EmptyStateLayout
            icon={<EmptyDocuments style={{ fontSize: "10rem" }} />}
            content="You don't have any Cron Jobs yet..."
          />
        ) : (
          <CronJobsTable cronJobs={cronJobs} />
        )}
      </ContentLayout>
    </>
  );
};

export default HomePage;
