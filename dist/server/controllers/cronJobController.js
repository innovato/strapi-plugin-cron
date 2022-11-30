"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async getAll(ctx) {
        try {
            const cronJobs = await strapi.plugin("cron").service("cron-job").getAll();
            ctx.body = cronJobs;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async getOne(ctx) {
        const { params } = ctx.request;
        try {
            const cronJob = await strapi
                .plugin("cron")
                .service("cron-job")
                .getOne(params.id);
            ctx.body = cronJob;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async create(ctx) {
        const { body } = ctx.request;
        const { errors } = strapi
            .plugin("cron")
            .service("validation")
            .validateCronJobData(body);
        if (errors) {
            return ctx.badRequest("ValidationError", { errors });
        }
        try {
            const newCronJob = await strapi
                .plugin("cron")
                .service("cron-job")
                .create(body);
            ctx.body = newCronJob;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async update(ctx) {
        const { params, body } = ctx.request;
        const { errors } = strapi
            .plugin("cron")
            .service("validation")
            .validateCronJobData(body);
        if (errors) {
            return ctx.badRequest("ValidationError", { errors });
        }
        try {
            const cronJob = await strapi
                .plugin("cron")
                .service("cron-job")
                .update(params.id, body);
            ctx.body = cronJob;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async publish(ctx) {
        const { params } = ctx.request;
        try {
            const cronJob = await strapi
                .plugin("cron")
                .service("cron-job")
                .update(params.id, {
                publishedAt: new Date(),
            });
            ctx.body = cronJob;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async unpublish(ctx) {
        const { params } = ctx.request;
        try {
            const cronJob = await strapi
                .plugin("cron")
                .service("cron-job")
                .update(params.id, {
                publishedAt: null,
                iterationsCount: null,
            });
            ctx.body = cronJob;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async delete(ctx) {
        const { params } = ctx.request;
        try {
            const deletedCronJob = await strapi
                .plugin("cron")
                .service("cron-job")
                .delete(params.id);
            ctx.body = deletedCronJob;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
});
