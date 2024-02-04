import React, { useEffect, useState } from 'react'

import { CronJob } from '../../../../types'
import { cron } from '../../api/cron'
import { CronJobsList } from '../../components/CronJobsList'
import { pluginBasePath } from '../../utils/plugin'

import {
  BaseHeaderLayout,
  Button,
  ContentLayout,
  EmptyStateLayout,
} from '@strapi/design-system'
import { LoadingIndicatorPage } from '@strapi/helper-plugin'
import { EmptyDocuments, Plus } from '@strapi/icons'
import { useHistory } from 'react-router-dom'

export const HomePage: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cronJobs, setCronJobs] = useState<CronJob[]>([])
  const history = useHistory()

  useEffect(() => {
    fetchCronJobs()
  }, [])

  async function fetchCronJobs() {
    const { data } = await cron.getAllCronJobs()
    setCronJobs(data)
    setIsLoading(false)
  }

  if (isLoading) return <LoadingIndicatorPage />

  return (
    <>
      <BaseHeaderLayout
        title="Cron Jobs"
        as="h2"
        primaryAction={
          <Button
            startIcon={<Plus />}
            onClick={() => history.push(`${pluginBasePath}/cron-jobs/create`)}
          >
            Add new cron job
          </Button>
        }
      />
      <ContentLayout>
        {cronJobs.length === 0 ? (
          <EmptyStateLayout
            icon={
              <EmptyDocuments style={{ width: '200px', height: '200px' }} />
            }
            content="You don't have any cron jobs yet..."
          />
        ) : (
          <CronJobsList cronJobs={cronJobs} fetchCronJobs={fetchCronJobs} />
        )}
      </ContentLayout>
    </>
  )
}

export default HomePage
