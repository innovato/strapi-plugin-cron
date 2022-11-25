import nodeSchedule from "node-schedule";
import { CronJob } from "../../types";
import { getExtensionsFileDefaultExport } from "../utils/pluginExtensions";

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const getCronJobTask = async (cronJob: CronJob) => {
  return cronJob.executeScriptFromFile
    ? await getExtensionsFileDefaultExport(cronJob.pathToScript)
    : new AsyncFunction(cronJob.script);
};

const exectuteAndCaptureStdOutput = async (callback) => {
  let stdOutputStr = "";

  const consoleLogFn = console.log;
  const logAndCaptureFn = function (...args) {
    stdOutputStr += args.join(" ") + "\n";
    consoleLogFn.apply(null, args);
  };

  console.log = logAndCaptureFn;
  await callback();
  console.log = consoleLogFn;
  return stdOutputStr;
};

export const createCronJobCallback = async (cronJob: CronJob) => {
  let { iterations, iterationsCount } = cronJob;
  const hasLimitedIterations = iterations !== -1;
  const task = await getCronJobTask(cronJob);

  return function () {
    if (hasLimitedIterations && iterationsCount >= iterations) {
      nodeSchedule.scheduledJobs[cronJob.name].cancel();
      return;
    }

    exectuteAndCaptureStdOutput(async () => {
      console.log(`[${new Date().toLocaleString()}]`);
      await task(strapi);
    }).then((stdOutputData) => {
      updateLatestExecutionLog(cronJob.id, stdOutputData);
      if (hasLimitedIterations) {
        updateCronJobIterationsCount(cronJob.id, ++iterationsCount);
      }
    });
  };
};

function updateCronJobIterationsCount(id: number, iterationsCount: number) {
  strapi.plugin("cron").service("cron-job").update(id, {
    iterationsCount,
  });
}

function updateLatestExecutionLog(id: number, latestExecutionLog: string) {
  strapi.plugin("cron").service("cron-job").update(id, {
    latestExecutionLog,
  });
}