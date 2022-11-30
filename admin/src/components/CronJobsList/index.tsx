import { Badge } from "@strapi/design-system/Badge";
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
import { TextButton } from "@strapi/design-system/TextButton";
import { Tooltip } from "@strapi/design-system/Tooltip";
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
import { getReadableDate } from "../../utils/date";
import { pluginBasePath } from "../../utils/plugin";

type Props = {
  cronJobs: CronJob[];
  fetchCronJobs(): Promise<void>;
};

export const CronJobsList: React.FunctionComponent<Props> = (props) => {
  const ROW_COUNT = 1;
  const COL_COUNT = 1;

  const history = useHistory();

  async function handleSwitchChange(cronJob: CronJob) {
    const isPublished = !!cronJob.publishedAt;
    const message = isPublished
      ? "This action will unpublish the cron job and reset its iterations count"
      : "This action will publish the cron job";
    const confirmation = confirm(message);
    if (!confirmation) {
      return;
    }
    await (isPublished
      ? cron.unpublishCronJob(cronJob.id)
      : cron.publishCronJob(cronJob.id));
    props.fetchCronJobs();
  }

  async function handleDeleteBtnClick(cronJob) {
    const confirmation = confirm("This action will delete: " + cronJob.name);
    if (!confirmation) {
      return;
    }
    await cron.deleteCronJob(cronJob.id);
    props.fetchCronJobs();
  }

  return (
    <Box marginBottom={8}>
      <Table
        rowCount={ROW_COUNT}
        colCount={COL_COUNT}
        footer={
          <TFooter
            onClick={() => {
              history.push(`${pluginBasePath}/cron-jobs/create`);
            }}
            icon={<Plus />}
          >
            Add new cron job
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
              <Typography variant="sigma">Start Date</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">End Date</Typography>
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
                <TextButton
                  onClick={() => {
                    history.push(`${pluginBasePath}/cron-jobs/${cronJob.id}`, {
                      cronJob,
                    });
                  }}
                >
                  <Typography textColor="primary700">{cronJob.name}</Typography>
                </TextButton>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {cronJob.schedule}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {cronJob.iterationsLimit === -1
                    ? "∞"
                    : cronJob.iterationsLimit}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {getReadableDate(cronJob.startDate) || "—"}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {getReadableDate(cronJob.endDate) || "—"}
                </Typography>
              </Td>
              <Td>
                <Flex justifyContent="justify-between">
                  <div style={{ width: "70px" }}>
                    <Flex justifyContent="center" grow="1">
                      {!cronJob.publishedAt ? (
                        <Badge>Draft</Badge>
                      ) : (
                        <Tooltip
                          description={getReadableDate(cronJob.publishedAt)}
                          position="bottom"
                        >
                          <Badge active>Published</Badge>
                        </Tooltip>
                      )}
                    </Flex>
                  </div>
                  <Flex justifyContent="justify-evenly">
                    <Flex paddingLeft="10px" paddingRight="10px">
                      <IconButton
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                        onClick={() => {
                          history.push(
                            `${pluginBasePath}/cron-jobs/edit/${cronJob.id}`,
                            {
                              cronJob,
                            }
                          );
                        }}
                      />
                      <IconButton
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                        onClick={() => handleDeleteBtnClick(cronJob)}
                      />
                    </Flex>
                    <Switch
                      label="Toggle cron job"
                      selected={!!cronJob.publishedAt}
                      onChange={() => handleSwitchChange(cronJob)}
                    />
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
