import { CronJob } from '../../../../types';
import { PLUGIN_ID } from './../../../../utils/plugin';

export default {
  afterUpdate({ result: cronJob }: { result: CronJob }) {
    strapi.plugin(PLUGIN_ID).service('cron').update(cronJob);
  },
  afterDelete({ result: cronJob }: { result: CronJob }) {
    strapi.plugin(PLUGIN_ID).service('cron').cancel(cronJob);
  },
};
