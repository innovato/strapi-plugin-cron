import { CronJobInputData } from '../../../../types';
import { PLUGIN_ID } from '../../../../utils/plugin';

import { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  getAll: async () => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findMany();
  },

  getOne: async (documentId: string) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findOne({
      documentId,
    });
  },

  getPublished: async () => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findMany({
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    }); // as Promise<CronJob[]>;
    // TODO
  },

  create: async (data: CronJobInputData) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).create({
      data,
    });
  },

  update: async (documentId: string, data: CronJobInputData) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).update({
      documentId,
      // TODO
      // @ts-ignore
      data,
    });
  },

  delete: async (documentId: string) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).delete({
      documentId,
    });
    //   scheduler.cancelJob(cronJob.name)
  },
});
