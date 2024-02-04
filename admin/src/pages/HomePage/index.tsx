import { BaseHeaderLayout, Button, ContentLayout, EmptyStateLayout } from "@strapi/design-system";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { EmptyDocuments, Plus } from "@strapi/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CronJob } from "../../../../types";
import { cron } from "../../api/cron";
import { CronJobsList } from "../../components/CronJobsList";
import { pluginBasePath } from "../../utils/plugin";

export const HomePage: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const history = useHistory();

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
      <BaseHeaderLayout
        title="cron jobs"
        as="h2"
        primaryAction={
          <Button
            startIcon={<Plus />}
            onClick={() => history.push(`${pluginBasePath}/cron-jobs/create`)}
          >
            Add new cron job
          </Button>
        }
      />
      <ContentLayout>
        {cronJobs.length === 0 ? (
          <EmptyStateLayout
            icon={<EmptyDocuments style={{ fontSize: "10rem" }} />}
            content="You don't have any cron jobs yet..."
          />
        ) : (
          <CronJobsList cronJobs={cronJobs} fetchCronJobs={fetchCronJobs} />
        )}
      </ContentLayout>
    </>
  );
};

export default HomePage;
