"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cron = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const cronJob_1 = require("./cronJob");
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
            .plugin("cron")
            .service("cron-job")
            .getPublished();
        for (const cronJob of cronJobs) {
            this.scheduleJob(cronJob);
        }
    }
    async scheduleJob(cronJob) {
        const cronJobCallback = await (0, cronJob_1.createCronJobCallback)(cronJob);
        const job = node_schedule_1.default.scheduleJob(cronJob.name, {
            start: cronJob.startDate,
            end: cronJob.endDate,
            rule: cronJob.schedule,
        }, cronJobCallback);
    }
    updateJob(cronJob) {
        const job = node_schedule_1.default.scheduledJobs[cronJob.name];
        const isNotPublished = !cronJob.publishedAt;
        if (job)
            job.cancel();
        if (isNotPublished)
            return;
        this.scheduleJob(cronJob);
    }
    deleteJob(cronJob) {
        const job = node_schedule_1.default.scheduledJobs[cronJob.name];
        if (job)
            job.cancel();
    }
}
const cron = new Cron();
exports.cron = cron;
