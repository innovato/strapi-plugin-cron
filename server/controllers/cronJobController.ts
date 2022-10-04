import { Strapi } from "@strapi/strapi";
const { ValidationError } = require("@strapi/utils").errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll(ctx: any) {
    try {
      const cronJobs = await strapi.plugin("cron").service("cron-job").getAll();
      ctx.body = cronJobs;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  async create(ctx: any) {
    const { body } = ctx.request;
    const validation = strapi
      .plugin("cron")
      .service("validation")
      .validateCronJobData(body);
    if (validation.errors) {
      return ctx.badRequest("ValidationError", {
        errors: validation.errors,
      });
    }
    try {
      const newCronJob = await strapi
        .plugin("cron")
        .service("cron-job")
        .create(body);
      ctx.body = newCronJob;
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
  async publish(ctx: any) {
    const { params } = ctx.request;
    try {
      const cronJob = await strapi
        .plugin("cron")
        .service("cron-job")
        .update(params.id, {
          publishedAt: new Date().toISOString(),
        });
      ctx.body = cronJob;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  async unpublish(ctx: any) {
    const { params } = ctx.request;
    try {
      const cronJob = await strapi
        .plugin("cron")
        .service("cron-job")
        .update(params.id, {
          publishedAt: null,
        });
      ctx.body = cronJob;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  async delete(ctx: any) {
    const { params } = ctx.request;
    try {
      const deletedCronJob = await strapi
        .plugin("cron")
        .service("cron-job")
        .delete(params.id);
      ctx.body = deletedCronJob;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
});
