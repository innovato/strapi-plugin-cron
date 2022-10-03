import { cron } from "../../../cron";

export default {
  beforeCreate() {
    // validate input
  },
  afterUpdate({ result: cronJob }) {
    cron.updateJob(cronJob);
  },
  afterDelete({ result: cronJob }) {
    cron.deleteJob(cronJob);
  },
};
