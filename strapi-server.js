"use strict";

const server = require("./dist/server");
const cron = require("node-schedule");

module.exports = {
  ...server.default,
  async bootstrap({ strapi }) {
    const serviceTest = await strapi
      .plugin("cronjob-manager")
      .service("cronjobService")
      .getWelcomeMessage();
    console.log(serviceTest);

    const jobs = await strapi
      .plugin("cronjob-manager")
      .service("cronjobService")
      .getCronJobs();

    scheduleJobs(jobs);
  },
};

function scheduleJobs(jobs) {
  for (const job of jobs) {
    cron.scheduleJob(job.schedule, new Function(job.script));
  }
}
