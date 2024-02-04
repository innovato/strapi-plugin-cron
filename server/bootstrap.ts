import { cron } from './cron/index'

import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => {
  cron.init()
}
