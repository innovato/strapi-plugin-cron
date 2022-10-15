import nodeSchedule from "node-schedule";
import { CronJob } from "./types";

// TODO
// //1. check if nodeSchedule.scheduledJobs are maintained according to publication state and start/end date
// 2. implement job details page with job logs
// 3. implement job schedule selector via dropdown inputs
// 4. home page should display a loading indicator when loading jobs, instead of no entries component
// 5. add tests

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

class Cron {
  async init() {
    const cronJobs = await strapi
      .plugin("cron")
      .service("cron-job")
      .getPublished();
    for (const cronJob of cronJobs) {
      this.scheduleJob(cronJob);
    }
  }

  scheduleJob(cronJob: CronJob) {
    const task = new AsyncFunction(cronJob.script);
    const job = nodeSchedule.scheduleJob(
      cronJob.name,
      {
        start: cronJob.startDate,
        end: cronJob.endDate,
        rule: cronJob.schedule,
      },
      () => task(strapi)
    );
  }

  updateJob(cronJob: CronJob) {
    const job = nodeSchedule.scheduledJobs[cronJob.name];
    const isPublished = !!cronJob.publishedAt;
    if (job) {
      job.cancel();
    }
    if (!isPublished) {
      return;
    }
    this.scheduleJob(cronJob);
  }

  deleteJob(cronJob: CronJob) {
    const job = nodeSchedule.scheduledJobs[cronJob.name];
    if (job) {
      job.cancel();
    }
  }
}

const cron = new Cron();

export { cron };
