import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getPublished() {
    return await strapi.query("plugin::cronjob-manager.cron-job").findMany({
      where: {
        publishedAt: {
          $notNull: true,
        },
      },
    });
  },
});
