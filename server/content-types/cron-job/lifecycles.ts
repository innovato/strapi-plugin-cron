import { cron } from "../../../cron";

export default {
  afterUpdate({ result: cronJob }) {
    cron.updateJob(cronJob);
  },
  afterDelete({ result: cronJob }) {
    cron.deleteJob(cronJob);
  },
};
