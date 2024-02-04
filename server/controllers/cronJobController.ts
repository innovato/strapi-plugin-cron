import { pluginName } from '../../utils/plugin'

import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll(ctx: any) {
    try {
      const cronJobs = await strapi
        .plugin(pluginName)
        .service('cron-job')
        .getAll()
      ctx.body = cronJobs
    } catch (e) {
      ctx.throw(500, e)
    }
  },
  async getOne(ctx: any) {
    const { params } = ctx.request
    try {
      const cronJob = await strapi
        .plugin(pluginName)
        .service('cron-job')
        .getOne(params.id)
      ctx.body = cronJob
    } catch (e) {
      ctx.throw(500, e)
    }
  },
  async create(ctx: any) {
    const { body } = ctx.request
    const { errors } = strapi
      .plugin(pluginName)
      .service('validation')
      .validateCronJobData(body)
    if (errors) {
      return ctx.badRequest('ValidationError', { errors })
    }
    try {
      const newCronJob = await strapi
        .plugin(pluginName)
        .service('cron-job')
        .create(body)
      ctx.body = newCronJob
    } catch (e) {
      ctx.throw(500, e)
    }
  },
  async update(ctx: any) {
    const { params, body } = ctx.request
    const { errors } = strapi
      .plugin(pluginName)
      .service('validation')
      .validateCronJobData(body)
    if (errors) {
      return ctx.badRequest('ValidationError', { errors })
    }
    try {
      const cronJob = await strapi
        .plugin(pluginName)
        .service('cron-job')
        .update(params.id, body)
      ctx.body = cronJob
    } catch (e) {
      ctx.throw(500, e)
    }
  },
  async publish(ctx: any) {
    const { params } = ctx.request
    try {
      const cronJob = await strapi
        .plugin(pluginName)
        .service('cron-job')
        .update(params.id, {
          publishedAt: new Date(),
        })
      ctx.body = cronJob
    } catch (e) {
      ctx.throw(500, e)
    }
  },
  async unpublish(ctx: any) {
    const { params } = ctx.request
    try {
      const cronJob = await strapi
        .plugin(pluginName)
        .service('cron-job')
        .update(params.id, {
          publishedAt: null,
          iterationsCount: null,
        })
      ctx.body = cronJob
    } catch (e) {
      ctx.throw(500, e)
    }
  },
  async delete(ctx: any) {
    const { params } = ctx.request
    try {
      const deletedCronJob = await strapi
        .plugin(pluginName)
        .service('cron-job')
        .delete(params.id)
      ctx.body = deletedCronJob
    } catch (e) {
      ctx.throw(500, e)
    }
  },
})
