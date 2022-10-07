import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import { Switch } from "@strapi/design-system/Switch";
import {
  Table,
  Tbody,
  Td,
  TFooter,
  Th,
  Thead,
  Tr,
} from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import CarretDown from "@strapi/icons/CarretDown";
import Pencil from "@strapi/icons/Pencil";
import Plus from "@strapi/icons/Plus";
import Trash from "@strapi/icons/Trash";
import React from "react";
import { useHistory } from "react-router-dom";
import { CronJob } from "../../../../types";
import { cron } from "../../api/cron";
import { pluginBasePath } from "../../utils/plugin";

type Props = {
  cronJobs: CronJob[];
  fetchCronJobs(): Promise<void>;
};

export const CronJobsList: React.FunctionComponent<Props> = (props) => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const history = useHistory();

  async function handleSwitchChange(cronJob: CronJob) {
    const isPublished = !!cronJob.publishedAt;
    await (isPublished
      ? cron.unpublishCronJob(cronJob.id)
      : cron.publishCronJob(cronJob.id));
    props.fetchCronJobs();
  }

  async function handleDeleteBtnClick(cronJob) {
    await cron.deleteCronJob(cronJob.id);
    props.fetchCronJobs();
  }

  return (
    <>
      <Table
        colCount={COL_COUNT}
        rowCount={ROW_COUNT}
        footer={
          <TFooter
            onClick={() => {
              history.push(`${pluginBasePath}/cron-jobs/create`);
            }}
            icon={<Plus />}
          >
            Add new Cron Job
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th
              action={
                <IconButton label="Sort on ID" icon={<CarretDown />} noBorder />
              }
            >
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th
              action={
                <IconButton
                  label="Sort on Name"
                  icon={<CarretDown />}
                  noBorder
                />
              }
            >
              <Typography variant="sigma">Name</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Schedule</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Iterations</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.cronJobs.map((cronJob) => (
            <Tr key={cronJob.id}>
              <Td>
                <Typography textColor="neutral800">{cronJob.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{cronJob.name}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {cronJob.schedule}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {cronJob.iterations}
                </Typography>
              </Td>
              <Td>
                <Flex justifyContent="space-evenly">
                  <Flex>
                    <IconButton
                      label="Edit"
                      noBorder
                      icon={<Pencil />}
                      onClick={() => {
                        history.push(`${pluginBasePath}/cron-jobs/edit`, {
                          cronJob,
                        });
                      }}
                    />
                    <Box paddingLeft={1}>
                      <IconButton
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                        onClick={() => handleDeleteBtnClick(cronJob)}
                      />
                    </Box>
                  </Flex>
                  <Switch
                    label="Toggle Cron Job"
                    selected={!!cronJob.publishedAt}
                    onChange={() => handleSwitchChange(cronJob)}
                    visibleLabels
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
