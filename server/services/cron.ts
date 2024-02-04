import { CronJob, CronJobInputData } from '../../types'
import { pluginName } from '../../utils/plugin'
import { captureConsoleOutput } from '../utils'
import { getDefaultModuleExport } from '../utils/extensions'
import { CronJobSchema } from './cron-job/schema'

import { Strapi } from '@strapi/strapi'
import { scheduleJob, scheduledJobs } from 'node-schedule'

export default ({ strapi }: { strapi: Strapi }) => ({
  initialize: async function () {
    const published = await strapi
      .service(`plugin::${pluginName}.cron-job`)
      .getPublished()
    for (const cronJob of published) this.update(cronJob)
  },

  update: async function (cronJob: CronJob) {
    this.cancel(cronJob)
    const isNotPublished = !cronJob.publishedAt
    if (isNotPublished) return
    scheduleJob(
      cronJob.name,
      {
        start: cronJob.startDate,
        end: cronJob.endDate,
        rule: cronJob.schedule,
      },
      await createCronJobCallback(cronJob)
    )
  },

  validateData: (data: CronJobInputData) => {
    const omitProps = {}
    data.executeScriptFromFile
      ? (omitProps['script'] = true)
      : (omitProps['pathToScript'] = true)

    const validation = CronJobSchema.omit(omitProps).safeParse(data)
    if (!validation.success) {
      return { errors: validation['error'].issues }
    }
    return { errors: null }
  },

  cancel: async (cronJob: CronJob) => {
    scheduledJobs[cronJob.name]?.cancel()
  },
})

const createCronJobCallback = async (
  cronJob: CronJob,
  { dryRun = false } = {}
) => {
  let { iterationsLimit, iterationsCount } = cronJob
  const hasLimitedIterations = iterationsLimit > -1
  const script = await getCronJobScript(cronJob)

  return function callback() {
    if (!dryRun && hasLimitedIterations && iterationsCount >= iterationsLimit) {
      scheduledJobs[cronJob.name].cancel()
      return
    }

    captureConsoleOutput(async () => {
      console.log(`[${new Date().toLocaleString()}]`)
      await script({ strapi, cronJob })
    }).then((logs) => {
      const data: Partial<CronJob> = { latestExecutionLog: logs }
      if (!dryRun && hasLimitedIterations)
        data.iterationsCount = ++iterationsCount
      strapi.plugin(pluginName).service('cron-job').update(cronJob.id, data)
    })
  }
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

const getCronJobScript = async (cronJob: CronJob) => {
  return cronJob.executeScriptFromFile
    ? await getDefaultModuleExport(cronJob.pathToScript)
    : new AsyncFunction(cronJob.script)
}
