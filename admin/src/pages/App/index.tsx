/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react'

import { CronJobDetails } from '../../components/CronJobDetails'
import { NotFound } from '../../components/NotFound'
import { pluginBasePath } from '../../utils/plugin'
import { EditCronJobPage } from '../EditCronJobPage'
import { HomePage } from '../HomePage'
import { NewCronJobPage } from '../NewCronJobPage'

import { Route, Routes } from 'react-router-dom'

const App: React.FunctionComponent = () => {
  return (
    <>
      <Routes>
        <Route path={`${pluginBasePath}`} component={HomePage} exact />
        <Route
          path={`${pluginBasePath}/cron-jobs/create`}
          component={NewCronJobPage}
          exact
        />
        <Route
          path={`${pluginBasePath}/cron-jobs/edit/:id`}
          component={EditCronJobPage}
          exact
        />
        <Route
          path={`${pluginBasePath}/cron-jobs/:id`}
          component={CronJobDetails}
          exact
        />
        <Route component={NotFound} />
      </Routes>
    </>
  )
}

export default App
