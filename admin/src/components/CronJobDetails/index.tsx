import { CodeBlock, xt256 } from "@discostudioteam/react-code-blocks";
import { BaseHeaderLayout, Box, ContentLayout, Divider, Grid, GridItem, Typography } from "@strapi/design-system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CronJob } from "../../../../types";
import { cron } from "../../api/cron";
import { getReadableDate } from "../../utils/date";
import { NotFound } from "../NotFound";
import { GoBackButton } from "../go-back-button";

type Props = {
  match: {
    params: { id: number };
  };
};

export const CronJobDetails: React.FunctionComponent<Props> = ({ match }) => {
  const location = useLocation<{cronJob: CronJob}>();
  const [cronJob, setCronJob] = useState<CronJob>(location.state?.cronJob);

  useEffect(() => {
    fetchCronJob();
  }, []);

  if (!cronJob) {
    return <NotFound />;
  }

  async function fetchCronJob() {
    const { data } = await cron.getCronJob(cronJob.id);
    setCronJob(data);
  }

  const executionLog =
    cronJob.latestExecutionLog?.map((line) => line.join(" ")).join("\n") ?? "";

  const PropRow = ({ name, value }) => (
    <>
      <GridItem col={2}>
        <Box>
          <Typography variant="epsilon">{name}</Typography>
        </Box>
      </GridItem>
      <GridItem col={4}>
        <Box>
          <Typography variant="epsilon">{value}</Typography>
        </Box>
      </GridItem>
      <GridItem col={6} paddingTop={3} paddingBottom={3}>
        <Divider />
      </GridItem>
    </>
  );

  const iterations =
    cronJob.iterationsLimit === -1
      ? "∞"
      : `${cronJob.iterationsCount} / ${cronJob.iterationsLimit}`;

  return (
    <>
      <BaseHeaderLayout title={cronJob?.name ?? ""} as="h2" navigationAction={<GoBackButton />} />
      <ContentLayout>
        <Box
          padding={8}
          marginBottom={8}
          borderStyle={"solid"}
          borderWidth={"1px"}
          borderColor={"neutral150"}
          borderRadius={"4px"}
          shadow="tableShadow"
          background="neutral0"
        >
          <Box>
            <Grid gap={1} gridCols={6}>
              <PropRow
                name="Published at"
                value={getReadableDate(cronJob.publishedAt) || "—"}
              />
              <PropRow name="Schedule" value={cronJob.schedule} />

              <PropRow
                name="Start date"
                value={getReadableDate(cronJob.startDate) || "—"}
              />
              <PropRow
                name="End date"
                value={getReadableDate(cronJob.endDate) || "—"}
              />
              <PropRow name="Iterations" value={iterations} />
              <GridItem col={6}>
                <Box paddingTop={6} paddingBottom={2}>
                  <Typography variant="epsilon">
                    Latest execution log
                  </Typography>
                </Box>
                {/* @ts-ignore */}
                <CodeBlock text={executionLog} theme={xt256} language="text" />
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </ContentLayout>
    </>
  );
};
