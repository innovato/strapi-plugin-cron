import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import React from "react";
import { useLocation } from "react-router-dom";
import { NotFound } from "../NotFound";

type Props = {
  match: {
    params: { id: number };
  };
};

export const CronJobDetails: React.FunctionComponent<Props> = ({ match }) => {
  const location = useLocation();
  const cronJob = location.state?.cronJob;

  if (!cronJob) {
    return <NotFound />;
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
