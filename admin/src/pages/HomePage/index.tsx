import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import EmptyDocuments from "@strapi/icons/EmptyDocuments";
import React, { useEffect, useState } from "react";
import { CronJob } from "../../../../types";
import { cron } from "../../api/cron";
import { CronJobsList } from "../../components/CronJobsList";

export const HomePage: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);

  useEffect(() => {
    fetchCronJobs();
  }, []);

  async function fetchCronJobs() {
    const { data } = await cron.getAllCronJobs();
    setCronJobs(data);
    setIsLoading(false);
  }

  if (isLoading) return <LoadingIndicatorPage />;

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
          <CronJobsList cronJobs={cronJobs} fetchCronJobs={fetchCronJobs} />
        )}
      </ContentLayout>
    </>
  );
};

export default HomePage;
