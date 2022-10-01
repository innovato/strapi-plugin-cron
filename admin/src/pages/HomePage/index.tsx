import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import EmptyDocuments from "@strapi/icons/EmptyDocuments";
import React, { useEffect, useReducer } from "react";
import { cron } from "../../api/cron";
import { CronJobs } from "../../components/CronJobs";
import { cronJobsReducer } from "../../utils/cronJobsReducer";

export const HomePage: React.FunctionComponent = () => {
  const [cronJobs, dispatch] = useReducer(cronJobsReducer, []);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    cron.getAllCronJobs().then((data) => {
      dispatch({
        type: "init",
        data,
      });
    });
  }

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
          <CronJobs cronJobs={cronJobs} dispatch={dispatch} />
        )}
      </ContentLayout>
    </>
  );
};

export default HomePage;
