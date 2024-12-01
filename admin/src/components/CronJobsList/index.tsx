import React, { useState } from 'react'

import { CronJob } from '../../../../types'
import { cron } from '../../api/cron'
import { getReadableDate } from '../../utils/date'
import { pluginBasePath } from '../../utils/plugin'

import {
  Badge,
  Box,
  Flex,
  IconButton,
  Switch,
  TFooter,
  Table,
  Td,
  TextButton,
  Th,
  Thead,
  Tooltip,
  Tr,
  Typography,
  VisuallyHidden,
} from '@strapi/design-system'
import { CarretDown, CarretUp, Pencil, Play, Plus, Trash } from '@strapi/icons'
import { useHistory } from 'react-router-dom'

type Props = {
  cronJobs: CronJob[]
  fetchCronJobs(): Promise<void>
}

export const CronJobsList: React.FunctionComponent<Props> = (props) => {
  const ROW_COUNT = 1
  const COL_COUNT = 1
  const history = useHistory()
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortKey, setSortKey] = useState<
    'id' | 'name' | 'startDate' | 'endDate' | 'publishedAt'
  >('id')

  async function handleTriggerClick(cronJob) {
    cron.triggerCronJob(cronJob.id)
  }

  async function handleEditClick(cronJob) {
    history.push(`${pluginBasePath}/cron-jobs/edit/${cronJob.id}`, { cronJob })
  }

  async function handleDeleteClick(cronJob) {
    const confirmation = confirm('This action will delete: ' + cronJob.name)
    if (!confirmation) {
      return
    }
    await cron.deleteCronJob(cronJob.id)
    props.fetchCronJobs()
  }

  async function handleToggleChange(cronJob: CronJob) {
    const isPublished = !!cronJob.publishedAt
    const message = isPublished
      ? 'This action will unpublish the cron job and reset its iterations count'
      : 'This action will publish the cron job'
    const confirmation = confirm(message)
    if (!confirmation) {
      return
    }
    await (isPublished
      ? cron.unpublishCronJob(cronJob.id)
      : cron.publishCronJob(cronJob.id))
    props.fetchCronJobs()
  }

  function toggleSortOrder() {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  function handleSort(key: typeof sortKey) {
    if (sortKey === key) {
      toggleSortOrder()
      return
    }
    setSortOrder('asc')
    setSortKey(key)
  }

  const SortButton = (props: { sortKey: typeof sortKey }) => {
    let Icon =
      sortKey === props.sortKey && sortOrder === 'asc' ? (
        <CarretUp />
      ) : (
        <CarretDown />
      )

    return (
      <IconButton
        onClick={(e) => handleSort(props.sortKey)}
        icon={Icon}
        noBorder
      />
    )
  }

  return (
    <Box marginBottom={8}>
      <Table
        rowCount={ROW_COUNT}
        colCount={COL_COUNT}
        footer={
          <TFooter
            onClick={() => {
              history.push(`${pluginBasePath}/cron-jobs/create`)
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
          {props.cronJobs
            .sort((a: CronJob, b: CronJob) => {
              const order =
                sortOrder === 'asc'
                  ? // @ts-ignore
                    a[sortKey] > b[sortKey]
                  : // @ts-ignore
                    a[sortKey] < b[sortKey]

              return order ? 1 : -1
            })
            .map((cronJob) => (
              <Tr key={cronJob.id}>
                <Td>
                  <Typography textColor="neutral800">{cronJob.id}</Typography>
                </Td>
                <Td>
                  <TextButton
                    onClick={() => {
                      history.push(
                        `${pluginBasePath}/cron-jobs/${cronJob.id}`,
                        {
                          cronJob,
                        }
                      )
                    }}
                  >
                    <Typography textColor="primary700">
                      {cronJob.name}
                    </Typography>
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
                      ? '∞'
                      : cronJob.iterationsLimit}
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
                      <IconButton
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                        onClick={() => handleEditClick(cronJob)}
                      />
                      <IconButton
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                        onClick={() => handleDeleteClick(cronJob)}
                      />
                      <IconButton
                        label="Trigger"
                        noBorder
                        icon={<Play />}
                        onClick={() => handleTriggerClick(cronJob)}
                      />
                    </Flex>
                    <Switch
                      label="Toggle"
                      selected={!!cronJob.publishedAt}
                      onChange={() => handleToggleChange(cronJob)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
      </Table>
    </Box>
  )
}
