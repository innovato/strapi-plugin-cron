import { Strapi } from "@strapi/strapi";

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
  async create(data) {
    return strapi.entityService.create("plugin::cron.cron-job", {
      data,
    });
  },
  async update(id, data) {
    return await strapi.entityService.update("plugin::cron.cron-job", id, {
      data,
    });
  },
  async delete(id) {
    return await strapi.entityService.delete("plugin::cron.cron-job", id);
  },
});
