import nodeSchedule from "node-schedule";
import { CronJob } from "../../types";
import { getDefaultModuleExport } from "../utils/extensions";

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const getCronJobScript = async (cronJob: CronJob) => {
  return cronJob.executeScriptFromFile
    ? await getDefaultModuleExport(cronJob.pathToScript)
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
  } catch (e) {
    console.log("* Script error\n", e);
  }

  console.log = consoleLogFn;

  try {
    return JSON.parse(JSON.stringify(stdOutputData));
  } catch (e) {
    console.log("* Script std output data parsing error", e);
    return {};
  }
};

export const createCronJobCallback = async (cronJob: CronJob) => {
  let { iterationsLimit, iterationsCount } = cronJob;
  const hasLimitedIterations = iterationsLimit > -1;
  const script = await getCronJobScript(cronJob);

  return function () {
    if (hasLimitedIterations && iterationsCount >= iterationsLimit) {
      nodeSchedule.scheduledJobs[cronJob.name].cancel();
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

function updateCronJobIterationsCount(id: number, iterationsCount: number) {
  strapi.plugin("cron").service("cron-job").update(id, {
    iterationsCount,
  });
}

function updateLatestExecutionLog(id: number, latestExecutionLog: object) {
  strapi.plugin("cron").service("cron-job").update(id, {
    latestExecutionLog,
  });
}
