import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll(ctx: any) {
    try {
      const cronJobs = await strapi.plugin("cron").service("cron-job").getAll();
      ctx.body = cronJobs;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  async update(ctx: any) {
    const { params, body } = ctx.request;
    try {
      const cronJob = await strapi
        .plugin("cron")
        .service("cron-job")
        .update(params.id, body);
      ctx.body = cronJob;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
});
