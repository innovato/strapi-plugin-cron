import { cron } from '../../cron/index'

export default {
  afterUpdate({ result: cronJob }) {
    cron.updateJob(cronJob)
  },
  afterDelete({ result: cronJob }) {
    cron.deleteJob(cronJob)
  },
}
