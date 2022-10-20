import pluginPkg from "../../../package.json";

export const pluginDisplayName = pluginPkg.strapi.displayName;

export const pluginId = pluginPkg.name.replace(
  /^(@[^-,.][\w,-]+\/|strapi-)plugin-/i,
  ""
);

export const pluginBasePath = `/plugins/${pluginId}`;
