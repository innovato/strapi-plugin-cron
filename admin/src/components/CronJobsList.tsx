import {
  Badge,
  Box,
  Flex,
  IconButton,
  Switch,
  Table,
  Tbody,
  Td,
  TextButton,
  TFooter,
  Th,
  Thead,
  Tooltip,
  Tr,
  Typography,
  VisuallyHidden,
} from '@strapi/design-system';
import { CaretDown, CaretUp, Pencil, Play, Plus, Trash } from '@strapi/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cron } from '../api/cron';
import { getReadableDate } from '../utils/date';

type Props = {
  cronJobs: CronJob[];
  fetchCronJobs(): Promise<void>;
};

export const CronJobsList: React.FunctionComponent<Props> = (props) => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<'id' | 'name' | 'startDate' | 'endDate' | 'publishedAt'>(
    'id'
  );

  async function handleTriggerClick(cronJob: CronJob) {
    cron.triggerCronJob(cronJob.documentId);
  }

  async function handleEditClick(cronJob: CronJob) {
    navigate(`${pluginBasePath}/cron-jobs/edit/${cronJob.documentId}`, { state: { cronJob } });
  }

  async function handleDeleteClick(cronJob: CronJob) {
    const confirmation = confirm('This action will delete: ' + cronJob.name);
    if (!confirmation) {
      return;
    }
    await cron.deleteCronJob(cronJob.documentId);
    props.fetchCronJobs();
  }

  async function handleToggleChange(cronJob: CronJob) {
    const isPublished = !!cronJob.publishedAt;
    const message = isPublished
      ? 'This action will unpublish the cron job and reset its iterations count'
      : 'This action will publish the cron job';
    const confirmation = confirm(message);
    if (!confirmation) {
      return;
    }
    await (isPublished
      ? cron.unpublishCronJob(cronJob.documentId)
      : cron.publishCronJob(cronJob.documentId));
    props.fetchCronJobs();
  }

  function toggleSortOrder() {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  function handleSort(key: typeof sortKey) {
    if (sortKey === key) {
      toggleSortOrder();
      return;
    }
    setSortOrder('asc');
    setSortKey(key);
  }

  const SortButton = (props: { sortKey: typeof sortKey }) => {
    let SortIcon = sortKey === props.sortKey && sortOrder === 'asc' ? <CaretUp /> : <CaretDown />;

    return (
      <Box marginLeft={2}>
        <IconButton size="XS" onClick={(e: Event) => handleSort(props.sortKey)}>
          {SortIcon}
        </IconButton>
      </Box>
    );
  };

  return (
    <Box marginBottom={8}>
      <Table
        rowCount={ROW_COUNT}
        colCount={COL_COUNT}
        footer={
          <TFooter
            onClick={() => {
              navigate(`${pluginBasePath}/cron-jobs/create`);
            }}
            icon={<Plus />}
          >
            Add new cron job
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th action={<SortButton sortKey="id" />}>
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th action={<SortButton sortKey="name" />}>
              <Typography variant="sigma">Name</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Schedule</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Iterations</Typography>
            </Th>
            <Th action={<SortButton sortKey="startDate" />}>
              <Typography variant="sigma">Start Date</Typography>
            </Th>
            <Th action={<SortButton sortKey="endDate" />}>
              <Typography variant="sigma">End Date</Typography>
            </Th>
            <Th action={<SortButton sortKey="publishedAt" />}>
              <Typography variant="sigma">Status</Typography>
            </Th>
            <Th action={null}>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.cronJobs
            .sort((a: CronJob, b: CronJob) => {
              const order =
                sortOrder === 'asc'
                  ? // @ts-ignore
                    a[sortKey] > b[sortKey]
                  : // @ts-ignore
                    a[sortKey] < b[sortKey];

              return order ? 1 : -1;
            })
            .map((cronJob) => (
              <Tr key={cronJob.documentId}>
                <Td>
                  <Typography textColor="neutral800">{cronJob.id}</Typography>
                </Td>
                <Td>
                  <TextButton
                    onClick={() => {
                      navigate(`${pluginBasePath}/cron-jobs/${cronJob.documentId}`, {
                        state: { cronJob },
                      });
                    }}
                  >
                    <Typography textColor="primary700">{cronJob.name}</Typography>
                  </TextButton>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{cronJob.schedule}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {cronJob.iterationsLimit === -1 ? '∞' : cronJob.iterationsLimit}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {getReadableDate(cronJob.startDate) || '—'}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {getReadableDate(cronJob.endDate) || '—'}
                  </Typography>
                </Td>
                <Td>
                  {!cronJob.publishedAt ? (
                    <Badge>Draft</Badge>
                  ) : (
                    <Tooltip
                      description={getReadableDate(cronJob.publishedAt)}
                      position="bottom"
                      label={undefined}
                      id={undefined}
                    >
                      <Badge active>Published</Badge>
                    </Tooltip>
                  )}
                </Td>
                <Td>
                  <Flex justifyContent="justify-evenly">
                    <Flex paddingLeft="10px" paddingRight="10px">
                      <Box marginLeft={2}>
                        <IconButton size="XS" label="Edit" onClick={() => handleEditClick(cronJob)}>
                          <Pencil />
                        </IconButton>
                      </Box>
                      <Box marginLeft={2}>
                        <IconButton
                          size="XS"
                          label="Delete"
                          onClick={() => handleDeleteClick(cronJob)}
                        >
                          <Trash />
                        </IconButton>
                      </Box>
                      <Box marginLeft={2}>
                        <IconButton
                          size="XS"
                          label="Trigger"
                          onClick={() => handleTriggerClick(cronJob)}
                        >
                          <Play />
                        </IconButton>
                      </Box>
                    </Flex>
                    <Switch
                      label="Toggle"
                      checked={!!cronJob.publishedAt}
                      onCheckedChange={() => handleToggleChange(cronJob)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};
