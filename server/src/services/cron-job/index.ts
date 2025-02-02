import { CronJobInputData } from '../../../../types';
import { PLUGIN_ID } from '../../../../utils/plugin';

import { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  getAll: async () => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findMany();
  },

  getOne: async (id: number) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).findOne({
      documentId: id.toString(),
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

  update: async (id: number, data: CronJobInputData) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).update({
      documentId: id.toString(),
      // TODO
      // @ts-ignore
      data,
    });
  },

  delete: async (id: number) => {
    return strapi.documents(`plugin::${PLUGIN_ID}.cron-job`).delete({
      documentId: id.toString(),
    });
    //   scheduler.cancelJob(cronJob.name)
  },
});
