import { CronJob } from '../../../../types';
import { PLUGIN_ID } from './../../../../utils/plugin';

export default {
  afterUpdate({ result: cronJob }: { result: CronJob }) {
    strapi.service(`plugin::${PLUGIN_ID}.cron`).update(cronJob);
  },
  afterDelete({ result: cronJob }: { result: CronJob }) {
    strapi.service(`plugin::${PLUGIN_ID}.cron`).cancel(cronJob);
  },
};
