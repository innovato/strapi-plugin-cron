import { Button } from "@strapi/design-system/Button";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import EmptyDocuments from "@strapi/icons/EmptyDocuments";
import Plus from "@strapi/icons/Plus";
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
