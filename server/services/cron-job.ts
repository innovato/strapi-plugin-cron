import { Strapi } from "@strapi/strapi";
import { CronJobInputData } from "../../types";
import { pluginName } from './../../utils/plugin';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll() {
    return strapi.entityService.findMany(`plugin::${pluginName}.cron-job`);
  },
  async getOne(id: number) {
    return strapi.entityService.findOne(`plugin::${pluginName}.cron-job`, id);
  },
  async getPublished() {
    return strapi.entityService.findMany(`plugin::${pluginName}.cron-job`, {
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    });
  },
  async create(data: CronJobInputData) {
    return strapi.entityService.create(`plugin::${pluginName}.cron-job`, {
      data,
    });
  },
  async update(id: number, data: CronJobInputData) {
    return strapi.entityService.update(`plugin::${pluginName}.cron-job`, id, {
      // @ts-ignore
      data,
    });
  },
  async delete(id: number) {
    return strapi.entityService.delete(`plugin::${pluginName}.cron-job`, id);
  },
});
