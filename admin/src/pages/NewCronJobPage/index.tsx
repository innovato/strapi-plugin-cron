import React from 'react'

import { cron } from '../../api/cron'
import { CronJobForm } from '../../components/CronJobForm'
import { GoBackButton } from '../../components/go-back-button'
import { getResponseErrors } from '../../utils/getResponseErrors'
import { pluginBasePath } from '../../utils/plugin'

import { useNavigate } from 'react-router-dom'

export const NewCronJobPage: React.FunctionComponent = () => {
  const history = useNavigate()

  async function handleFormSubmit({ input, setErrors }) {
    try {
      await cron.createNewCronJob(input)
      history(pluginBasePath)
    } catch (error) {
      const errors = getResponseErrors(error.response)
      setErrors(errors)
    }
  }

  return (
    <>
      <div>
        <CronJobForm handleSubmit={handleFormSubmit} />
      </div>
    </>
  )
}
