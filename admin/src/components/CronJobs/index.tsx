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
import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { CronJob } from "../../../../types";
import { pluginBasePath } from "../../utils/plugin";
import { Entry } from "./types";
import { entriesReducer, getEntries } from "./utils";

type Props = {
  cronJobs: CronJob[];
};

export const CronJobs: React.FunctionComponent<Props> = (props) => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const history = useHistory();
  const [entries, dispatch] = useReducer(
    entriesReducer,
    getEntries(props.cronJobs)
  );

  function handleSwitchChange(entry: Entry) {
    const action = {
      type: entry.enabled ? "disable" : "enable",
      entryId: entry.id,
    };
    dispatch(action);
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
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {entries.map((entry) => (
            <Tr key={entry.id}>
              <Td>
                <Typography textColor="neutral800">{entry.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.name}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.schedule}</Typography>
              </Td>
              <Td>
                <Flex justifyContent="space-evenly">
                  <Flex>
                    <IconButton
                      onClick={() => console.log("edit")}
                      label="Edit"
                      noBorder
                      icon={<Pencil />}
                    />
                    <Box paddingLeft={1}>
                      <IconButton
                        onClick={() => console.log("delete")}
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                      />
                    </Box>
                  </Flex>
                  <Switch
                    label="Toggle Cron Job"
                    selected={entry.enabled}
                    onChange={() => handleSwitchChange(entry)}
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
