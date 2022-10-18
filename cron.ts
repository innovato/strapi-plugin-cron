import nodeSchedule from "node-schedule";
import { CronJob } from "./types";

// TODO
// - implement job details page with job logs
// - path to file
// - job schedule regex validation
// - validate in cron job service instead of in controller?
// - remove form placeholder data
// - Strapi DatePicker component bug: when date picker popover has been activated,
//    and date has not been selected, and user navigates back with a click of a button
//    a TypeError "source is null" is thrown
// TODO Extra
// - implement job schedule selector via dropdown inputs
// - add tests
// - cron jobs list sort

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
    let { iterations, iterationsCount } = cronJob;
    const task = new AsyncFunction(cronJob.script);
    const job = nodeSchedule.scheduleJob(
      cronJob.name,
      {
        start: cronJob.startDate,
        end: cronJob.endDate,
        rule: cronJob.schedule,
      },
      () => {
        if (iterations !== -1 && iterations <= iterationsCount) {
          nodeSchedule.scheduledJobs[cronJob.name].cancel();
          return;
        }
        task(strapi);
        if (iterations > 0) {
          strapi
            .plugin("cron")
            .service("cron-job")
            .update(cronJob.id, {
              iterationsCount: ++iterationsCount,
            });
        }
      }
    );
  }

  updateJob(cronJob: CronJob) {
    const job = nodeSchedule.scheduledJobs[cronJob.name];
    const isNotPublished = !cronJob.publishedAt;
    if (job) {
      job.cancel();
    }
    if (isNotPublished) {
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
