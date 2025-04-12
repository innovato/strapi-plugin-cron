import {
  Alert,
  Badge,
  Box,
  Button,
  EmptyStateLayout,
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
import { EmptyDocuments } from '@strapi/icons/symbols';
import { Page } from '@strapi/strapi/admin';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cronApi } from '../api/cron';
import { PageLayout } from '../components/PageLayout';
import { getDateAndTimeString, getDateString } from '../utils/date';

export const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<'name' | 'startDate' | 'endDate' | 'publicationDate'>(
    'name'
  );
  const [triggerStatus, setTriggerStatus] = useState<null | 'error' | 'success'>(null);
  const {
    isPending,
    data: cronJobs,
    refetch,
  } = useQuery({
    queryKey: ['cronJobs'],
    queryFn: () => cronApi.getAllCronJobs(),
  });
  const deleteMutation = useMutation({
    mutationFn: cronApi.deleteCronJob,
    onSuccess: () => {
      refetch();
    },
  });

  async function handleTriggerClick(cronJob: CronJob) {
    try {
      await cronApi.triggerCronJob(cronJob.documentId);
      setTriggerStatus('success');
    } catch (e) {
      setTriggerStatus('error');
    } finally {
      setTimeout(() => setTriggerStatus(null), 2000);
    }
  }

  async function handleEditClick(cronJob: CronJob) {
    navigate(`${pluginBasePath}/cron-jobs/edit/${cronJob.documentId}`);
  }

  async function handleDeleteClick(cronJob: CronJob) {
    const confirmation = confirm('This action will delete: ' + cronJob.name);
    if (!confirmation) return;
    deleteMutation.mutate(cronJob.documentId);
  }

  async function handleToggleChange(cronJob: CronJob) {
    const isPublished = !!cronJob.publicationDate;
    const message = isPublished
      ? 'This action will unpublish the cron job and reset its iterations count'
      : 'This action will publish the cron job';
    const confirmation = confirm(message);
    if (!confirmation) return;
    await (isPublished
      ? cronApi.unpublishCronJob(cronJob.documentId)
      : cronApi.publishCronJob(cronJob.documentId));
    refetch();
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
    const valueA = a[sortKey as keyof CronJob] ?? '';
    const valueB = b[sortKey as keyof CronJob] ?? '';

    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  };

  if (isPending) return <Page.Loading />;

  if (!cronJobs || cronJobs?.length === 0)
    return (
      <PageLayout title="Cron Jobs">
        <EmptyStateLayout
          icon={<EmptyDocuments style={{ width: '200px', height: '200px' }} />}
          content="You don't have any cron jobs yet..."
          action={
            <Button
              startIcon={<Plus />}
              onClick={() => navigate(`${pluginBasePath}/cron-jobs/create`)}
            >
              Add new cron job
            </Button>
          }
        />
      </PageLayout>
    );

  return (
    <PageLayout title="Cron Jobs">
      {triggerStatus && (
        <TriggerAlert triggerStatus={triggerStatus} onClose={() => setTriggerStatus(null)} />
      )}
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
            {cronJobs.sort(sortByCurrentKey).map((cronJob) => (
              <Tr key={cronJob.documentId}>
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
                    <Typography textColor="neutral800">
                      {getDateString(cronJob.startDate)}
                    </Typography>
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
                          label="Test Run"
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
    </PageLayout>
  );
};

const TriggerAlert = ({
  triggerStatus,
  onClose,
}: {
  triggerStatus: null | 'error' | 'success';
  onClose: () => void;
}) => {
  if (!triggerStatus) return null;

  const variant = {
    success: 'success',
    error: 'danger',
  }[triggerStatus];

  const message = {
    success: 'Success',
    error: 'Error',
  }[triggerStatus];

  return (
    <Box
      style={{
        width: '100%',
        position: 'fixed',
        top: 20,
        left: 0,
        zIndex: 10,
      }}
    >
      <Flex direction="column" alignItems="center">
        <Alert closeLabel="asdasdasddas" title="Test Run:" variant={variant} onClose={onClose}>
          {message}
        </Alert>
      </Flex>
    </Box>
  );
};
