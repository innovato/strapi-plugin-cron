import nodeSchedule from "node-schedule";
import { CronJob } from "../../types";
import { pluginName } from "../../utils/plugin";
import { createCronJobCallback } from "./cronJob";

// TODO
// - Strapi DatePicker component bug: when date picker popover has been activated,
//    and date has not been selected, and user navigates back with a click of a button
//    a TypeError "source is null" is thrown
// - implement job schedule selector via dropdown inputs
// - add tests
// - cron jobs list sort

class Cron {
  async init() {
    const cronJobs = await strapi
      .plugin(pluginName)
      .service("cron-job")
      .getPublished();
    for (const cronJob of cronJobs) {
      this.scheduleJob(cronJob);
    }
  }

  async scheduleJob(cronJob: CronJob) {
    const cronJobCallback = await createCronJobCallback(cronJob);
    const job = nodeSchedule.scheduleJob(
      cronJob.name,
      {
        start: cronJob.startDate,
        end: cronJob.endDate,
        rule: cronJob.schedule,
      },
      cronJobCallback
    );
  }

  updateJob(cronJob: CronJob) {
    const job = nodeSchedule.scheduledJobs[cronJob.name];
    const isNotPublished = !cronJob.publishedAt;
    if (job) job.cancel();
    if (isNotPublished) return;
    this.scheduleJob(cronJob);
  }

  deleteJob(cronJob: CronJob) {
    const job = nodeSchedule.scheduledJobs[cronJob.name];
    if (job) job.cancel();
  }
}

const cron = new Cron();

export { cron };
