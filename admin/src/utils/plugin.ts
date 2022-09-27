import pluginPkg from "../../../package.json";
import pluginId from "../pluginId";

export const pluginName = pluginPkg.strapi.displayName;

export const pluginBasePath = `/plugins/${pluginId}`;
