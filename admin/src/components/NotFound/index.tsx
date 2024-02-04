import { BaseHeaderLayout, ContentLayout, EmptyStateLayout } from "@strapi/design-system";
import { EmptyDocuments } from "@strapi/icons";
import React from "react";

export const NotFound: React.FunctionComponent = () => {
  return (
    <>
      <BaseHeaderLayout title="Page not found" />
      <ContentLayout>
        <EmptyStateLayout
          icon={<EmptyDocuments style={{ fontSize: "10rem" }} />}
          content="Oops! We can't seem to find the page you're looking for..."
        />
      </ContentLayout>
    </>
  );
};
