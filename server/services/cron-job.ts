import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll() {
    return await strapi.query("plugin::cron.cron-job").findMany();
  },
  async getPublished() {
    return await strapi.query("plugin::cron.cron-job").findMany({
      where: {
        publishedAt: {
          $notNull: true,
        },
      },
    });
  },
});
