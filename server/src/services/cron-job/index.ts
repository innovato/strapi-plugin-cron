import { CronJob } from '../../../../types';
import { PLUGIN_ID } from '../../../../utils/plugin';

import { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  getAll: async () => {
    const drafts = strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findMany();
    const published = strapi
      .documents(`plugin::${PLUGIN_ID}.cron-job`)
      .findMany({ status: 'published' });
    const results = (await Promise.all([drafts, published])).flat();

    // Strapi apparently clones an entity whenever it's published and keeps the original draft in the database.
    // // This code selects the latest version by highest `id` number if multiple entities with same documentId exist.
    // This code selects the published version if multiple entities with same documentId exist.
    const resultsMap = results.reduce(
      (acc, cronJob: CronJob) => {
        if (!acc[cronJob.documentId]) acc[cronJob.documentId] = cronJob;
        else {
          const isPublished = !!acc[cronJob.documentId].publishedAt;
          // // const moreRecent = acc[cronJob.documentId].id > cronJob.id;
          if (!isPublished) acc[cronJob.documentId] = cronJob;
        }
        return acc;
      },
      {} as Record<string, CronJob>
    );

    return Object.values(resultsMap);
  },
  getOne: async (documentId: string) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findOne({
      documentId,
    });
  },
  getPublished: async () => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findMany({
      status: 'published',
    });
  },
  create: async (data) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).create({
      data,
    });
  },
  update: async (documentId: string, data) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).update({
      documentId,
      data,
    });
  },
  publish: async (documentId: string) => {
    const cronJob = await strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).update({
      documentId,
      data: {
        // @ts-ignore
        iterationsCount: 0,
      },
      status: 'published',
    });
    await strapi.plugin(PLUGIN_ID).service('cron').updateSchedule(cronJob);
    return cronJob;
  },
  unpublish: async (documentId: string) => {
    const cronJob = await strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).update({
      documentId,
      status: 'draft',
    });
    await strapi.plugin(PLUGIN_ID).service('cron').updateSchedule(cronJob);
    return cronJob;
  },
  delete: async (documentId: string) => {
    const cronJob = await strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).delete({
      documentId,
    });
    await strapi.plugin(PLUGIN_ID).service('cron').cancel(cronJob);
    return;
  },
});
