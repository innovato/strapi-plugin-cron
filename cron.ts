import nodeSchedule from "node-schedule";
import { CronJob } from "./types";

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
    const job = nodeSchedule.scheduleJob(cronJob.name, cronJob.schedule, () =>
      task(strapi)
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
