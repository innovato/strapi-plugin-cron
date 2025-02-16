import { CronJob, CronJobInputData } from '../../../types';
import { PLUGIN_ID } from '../../../utils/plugin';
import { captureConsoleOutput } from '../utils';
import { getDefaultModuleExport } from '../utils/extensions';
import { CronJobSchema } from './cron-job/schema';

import type { Core } from '@strapi/strapi';
import { scheduleJob, scheduledJobs } from 'node-schedule';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  initialize: async function () {
    const published = await strapi.plugin(PLUGIN_ID).service('cron-job').getPublished();
    for (const cronJob of published) this.updateSchedule(cronJob);
  },
  updateSchedule: async function (cronJob: CronJob) {
    this.cancel(cronJob);
    if (!cronJob.publishedAt) return;
    const cronJobCallback = await createCronJobCallback(cronJob);
    scheduleJob(
      cronJob.documentId,
      {
        start: cronJob.startDate,
        end: cronJob.endDate,
        rule: cronJob.schedule,
      },
      cronJobCallback
    );
  },
  validateData: (data: CronJobInputData) => {
    const validation = CronJobSchema.safeParse(data);
    if (!validation.success) return { errors: validation['error'].issues };
    return { errors: null };
  },
  cancel: async (cronJob: CronJob) => {
    scheduledJobs[cronJob.documentId]?.cancel();
  },
  trigger: async (cronJob: CronJob) => {
    const cronJobCallback = await createCronJobCallback(cronJob, {
      dryRun: true,
    });
    cronJobCallback();
  },
});

const createCronJobCallback = async (cronJob: CronJob, { dryRun = false } = {}) => {
  const hasIterationsLimit = cronJob.iterationsLimit > -1;
  const script = await getCronJobScript(cronJob);

  return function callback() {
    if (!dryRun && hasIterationsLimit && cronJob.iterationsCount >= cronJob.iterationsLimit) {
      scheduledJobs[cronJob.documentId].cancel();
      return;
    }
    if (!dryRun && hasIterationsLimit) cronJob.iterationsCount += 1;
    captureConsoleOutput(async () => {
      console.log(`-- ${new Date().toLocaleString()}`);
      try {
        await script({ strapi, cronJob });
      } catch (e) {
        console.log(e);
      }
    }).then((logs) => {
      const data: Partial<CronJob> = {
        latestExecutionLog: logs,
        iterationsCount: cronJob.iterationsCount,
      };
      strapi.plugin(PLUGIN_ID).service('cron-job').update(cronJob.documentId, data);
    });
  };
};

const getCronJobScript = async (
  cronJob: CronJob
): Promise<({ strapi, cronJob }: { strapi: Core.Strapi; cronJob: CronJob }) => Promise<void>> => {
  if (cronJob.executeScriptFromFile) {
    return await getDefaultModuleExport(cronJob.pathToScript);
  }
  return ({ strapi, cronJob }) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const scriptFunction = new Function(
          'strapi',
          'cronJob',
          'resolve',
          'reject',
          `
          try {
            ${cronJob.script}
            resolve();
          } catch (error) {
            reject(error);
          }
        `
        );
        scriptFunction(strapi, cronJob, resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  };
};
