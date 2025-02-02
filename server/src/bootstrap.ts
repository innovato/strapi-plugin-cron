import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../utils/plugin';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase
  strapi.plugin(PLUGIN_ID).service('cron').initialize();
};

export default bootstrap;
