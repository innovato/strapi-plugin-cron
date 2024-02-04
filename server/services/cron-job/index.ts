import { CronJob, CronJobInputData } from '../../../types'
import { pluginName } from '../../../utils/plugin'

import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
  getAll: async () => {
    return strapi.entityService.findMany(`plugin::${pluginName}.cron-job`)
  },

  getOne: async (id: number) => {
    return strapi.entityService.findOne(`plugin::${pluginName}.cron-job`, id)
  },

  getPublished: async () => {
    return strapi.entityService.findMany(`plugin::${pluginName}.cron-job`, {
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    }) as Promise<CronJob[]>
  },

  create: async (data: CronJobInputData) => {
    return strapi.entityService.create(`plugin::${pluginName}.cron-job`, {
      data,
    })
  },

  update: async (id: number, data: CronJobInputData) => {
    return strapi.entityService.update(`plugin::${pluginName}.cron-job`, id, {
      // @ts-ignore
      data,
    })
  },

  delete: async (id: number) => {
    return strapi.entityService.delete(`plugin::${pluginName}.cron-job`, id)
    //   scheduler.cancelJob(cronJob.name)
  },
})
