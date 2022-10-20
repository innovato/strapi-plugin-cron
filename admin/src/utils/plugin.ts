import pluginPkg from "../../../package.json";
import pluginId from "../pluginId";

export const pluginDisplayName = pluginPkg.strapi.displayName;

export const pluginBasePath = `/plugins/${pluginId}`;
