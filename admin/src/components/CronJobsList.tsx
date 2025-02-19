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
import { getDateAndTimeString, getDateString } from '../utils/date';

type Props = {
  cronJobs: CronJob[];
  fetchCronJobs(): Promise<void>;
};

export const CronJobsList: React.FunctionComponent<Props> = (props) => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<
    'id' | 'name' | 'startDate' | 'endDate' | 'publicationDate'
  >('id');

  async function handleTriggerClick(cronJob: CronJob) {
    cron.triggerCronJob(cronJob.documentId);
  }

  async function handleEditClick(cronJob: CronJob) {
    navigate(`${pluginBasePath}/cron-jobs/edit/${cronJob.documentId}`);
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
    const isPublished = !!cronJob.publicationDate;
    const message = isPublished
      ? 'This action will unpublish the cron job and reset its iterations count'
      : 'This action will publish the cron job';
    const confirmation = confirm(message);
    if (!confirmation) return;
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
        <IconButton variant={'ghost'} size="XS" onClick={(e: Event) => handleSort(props.sortKey)}>
          {SortIcon}
        </IconButton>
      </Box>
    );
  };

  const sortByCurrentKey = (a: CronJob, b: CronJob) => {
    // Null-safe sorting with fallback values
    const valueA = a[sortKey as keyof CronJob] ?? '';
    const valueB = b[sortKey as keyof CronJob] ?? '';

    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  };

  return (
    <Box marginBottom={8}>
      <Table
        rowCount={6}
        colCount={10}
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
            <Th action={<SortButton sortKey="publicationDate" />}>
              <Typography variant="sigma">Status</Typography>
            </Th>
            <Th action={null}>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.cronJobs.sort(sortByCurrentKey).map((cronJob) => (
            <Tr key={cronJob.documentId}>
              <Td>
                <Tooltip label={cronJob.documentId}>
                  <Typography textColor="neutral800" ellipsis width={'50px'}>
                    {cronJob.documentId}
                  </Typography>
                </Tooltip>
              </Td>
              <Td>
                <TextButton
                  onClick={() => {
                    navigate(`${pluginBasePath}/cron-jobs/${cronJob.documentId}`);
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
                <Tooltip label={getDateAndTimeString(cronJob.startDate)}>
                  <Typography textColor="neutral800">{getDateString(cronJob.startDate)}</Typography>
                </Tooltip>
              </Td>
              <Td>
                <Tooltip label={getDateAndTimeString(cronJob.endDate)}>
                  <Typography textColor="neutral800">{getDateString(cronJob.endDate)}</Typography>
                </Tooltip>
              </Td>
              <Td>
                {!cronJob.publicationDate ? (
                  <Badge>Draft</Badge>
                ) : (
                  <Tooltip label={getDateAndTimeString(cronJob.publicationDate)}>
                    <Box>
                      <Badge active>Published</Badge>
                    </Box>
                  </Tooltip>
                )}
              </Td>
              <Td>
                <Flex justifyContent="justify-evenly">
                  <Flex paddingLeft="10px" paddingRight="10px">
                    <Box marginLeft={2}>
                      <IconButton
                        disabled={!!cronJob.publicationDate}
                        size="XS"
                        label="Edit"
                        onClick={() => handleEditClick(cronJob)}
                      >
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
                    checked={!!cronJob.publicationDate}
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
