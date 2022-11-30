"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cron = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
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
    scheduleJob(cronJob) {
        const task = new AsyncFunction(cronJob.script);
        const job = node_schedule_1.default.scheduleJob(cronJob.name, cronJob.schedule, () => task(strapi));
    }
    updateJob(cronJob) {
        const job = node_schedule_1.default.scheduledJobs[cronJob.name];
        const isPublished = !!cronJob.publishedAt;
        if (job) {
            job.cancel();
        }
        if (!isPublished) {
            return;
        }
        this.scheduleJob(cronJob);
    }
    deleteJob(cronJob) {
        const job = node_schedule_1.default.scheduledJobs[cronJob.name];
        if (job) {
            job.cancel();
        }
    }
}
const cron = new Cron();
exports.cron = cron;
