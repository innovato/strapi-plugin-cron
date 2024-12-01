import React, { useEffect, useState } from 'react'

import { CronJob } from '../../../../types'
import { cron } from '../../api/cron'
import { CronJobsList } from '../../components/CronJobsList'
import { pluginBasePath } from '../../utils/plugin'

import {
  Button,
  EmptyStateLayout,
} from '@strapi/design-system'
import { Plus } from '@strapi/icons'
import { useNavigate } from 'react-router-dom'

export const HomePage: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cronJobs, setCronJobs] = useState<CronJob[]>([])
  const history = useNavigate()

  useEffect(() => {
    fetchCronJobs()
  }, [])

  async function fetchCronJobs() {
    const { data } = await cron.getAllCronJobs()
    setCronJobs(data)
    setIsLoading(false)
  }

  if (isLoading) return <span>Loading...</span>

  return (
    <>
      <div>
          <Button
            startIcon={<Plus />}
            onClick={() => history(`${pluginBasePath}/cron-jobs/create`)}
          >
            Add new cron job
          </Button>
        </div>
        <div>
        {cronJobs.length === 0 ? (
          <div>
            content="You don't have any cron jobs yet...
          </div>
        ) : (
          <CronJobsList cronJobs={cronJobs} fetchCronJobs={fetchCronJobs} />
        )}
        </div>
    </>
  )
}

export default HomePage
