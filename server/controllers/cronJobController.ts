import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll(ctx) {
    try {
      const cronJobs = await strapi.plugin("cron").service("cron-job").getAll();
      ctx.body = cronJobs;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
});
