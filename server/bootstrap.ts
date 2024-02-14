import { pluginName } from '../utils/plugin'

import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.service(`plugin::${pluginName}.cron`).initialize()
}
