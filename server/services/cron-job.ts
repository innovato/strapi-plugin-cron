import { Strapi } from "@strapi/strapi";
import { CronJobInputData } from "../../types";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll() {
    return strapi.entityService.findMany("plugin::cron.cron-job");
  },
  async getPublished() {
    return strapi.entityService.findMany("plugin::cron.cron-job", {
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    });
  },
  async create(data: CronJobInputData) {
    return strapi.entityService.create("plugin::cron.cron-job", {
      data,
    });
  },
  async update(id: number, data: CronJobInputData) {
    return await strapi.entityService.update("plugin::cron.cron-job", id, {
      data,
    });
  },
  async delete(id: number) {
    return await strapi.entityService.delete("plugin::cron.cron-job", id);
  },
});
