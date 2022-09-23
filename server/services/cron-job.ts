import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
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
