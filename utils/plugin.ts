import pluginPkg from '../package.json';

export const PLUGIN_ID = pluginPkg.strapi.name;

export const pluginDisplayName = pluginPkg.strapi.displayName;

export const pluginBasePath = `/plugins/${PLUGIN_ID}`;
