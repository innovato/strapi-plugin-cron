import pluginPkg from '../package.json';

export const PLUGIN_ID = pluginPkg.strapi.name; // 'strapi-plugin-cron';

export const pluginDisplayName = pluginPkg.strapi.displayName;

export const pluginBasePath = `/plugins/${PLUGIN_ID}`;
