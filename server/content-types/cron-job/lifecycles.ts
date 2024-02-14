import { CronJob } from '../../../types'
import { pluginName } from '../../../utils/plugin'

export default {
  afterUpdate({ result: cronJob }: { result: CronJob }) {
    strapi.service(`plugin::${pluginName}.cron`).update(cronJob)
  },
  afterDelete({ result: cronJob }: { result: CronJob }) {
    strapi.service(`plugin::${pluginName}.cron`).cancel(cronJob)
  },
}
