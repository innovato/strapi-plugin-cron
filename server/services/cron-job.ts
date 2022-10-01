import { Strapi } from "@strapi/strapi";
import { CronJob } from "../../types";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll() {
    return await strapi.entityService.findMany("plugin::cron.cron-job");
  },
  async getPublished() {
    return await strapi.entityService.findMany("plugin::cron.cron-job", {
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    });
  },
  async update(id: number, data: Partial<CronJob>) {
    return await strapi.entityService.update("plugin::cron.cron-job", id, {
      data,
    });
  },
});
