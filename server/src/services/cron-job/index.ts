import { PLUGIN_ID } from '../../../../utils/plugin';

import { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  getAll: async () => {
    const cronJobs = await strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findMany();
    return cronJobs;
  },
  getOne: async (documentId: string) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findOne({
      documentId,
    });
  },
  getPublished: async () => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findMany({
      filters: {
        publicationDate: {
          $notNull: true,
        },
      },
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
        publicationDate: new Date(),
      },
    });
    await strapi.plugin(PLUGIN_ID).service('cron').updateSchedule(cronJob);
    return cronJob;
  },
  unpublish: async (documentId: string) => {
    const cronJob = await strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).update({
      documentId,
      data: {
        // @ts-ignore
        publicationDate: null,
      },
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
