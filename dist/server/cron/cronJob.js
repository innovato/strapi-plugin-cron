"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCronJobCallback = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const extensions_1 = require("../utils/extensions");
const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
const getCronJobScript = async (cronJob) => {
    return cronJob.executeScriptFromFile
        ? await (0, extensions_1.getDefaultModuleExport)(cronJob.pathToScript)
        : new AsyncFunction(cronJob.script);
};
const exectuteAndCaptureStdOutput = async (callback) => {
    let stdOutputData = [];
    const consoleLogFn = console.log;
    const logAndCaptureFn = function (...args) {
        stdOutputData.push(args);
        consoleLogFn(...args);
    };
    console.log = logAndCaptureFn;
    try {
        await callback();
    }
    catch (e) {
        console.log("* Script error\n", e);
    }
    console.log = consoleLogFn;
    try {
        return JSON.parse(JSON.stringify(stdOutputData));
    }
    catch (e) {
        console.log("* Script std output data parsing error", e);
        return {};
    }
};
const createCronJobCallback = async (cronJob) => {
    let { iterationsLimit, iterationsCount } = cronJob;
    const hasLimitedIterations = iterationsLimit > -1;
    const script = await getCronJobScript(cronJob);
    return function () {
        if (hasLimitedIterations && iterationsCount >= iterationsLimit) {
            node_schedule_1.default.scheduledJobs[cronJob.name].cancel();
            return;
        }
        exectuteAndCaptureStdOutput(async () => {
            console.log(`[${new Date().toLocaleString()}]`);
            await script({ strapi, cronJob });
        }).then((stdOutputData) => {
            updateLatestExecutionLog(cronJob.id, stdOutputData);
            if (hasLimitedIterations) {
                updateCronJobIterationsCount(cronJob.id, ++iterationsCount);
            }
        });
    };
};
exports.createCronJobCallback = createCronJobCallback;
function updateCronJobIterationsCount(id, iterationsCount) {
    strapi.plugin("cron").service("cron-job").update(id, {
        iterationsCount,
    });
}
function updateLatestExecutionLog(id, latestExecutionLog) {
    strapi.plugin("cron").service("cron-job").update(id, {
        latestExecutionLog,
    });
}
