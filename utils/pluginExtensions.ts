import { pluginName } from "./pluginName";

export const getPathToExtensionsFile = (path: string) => {
  const rootDir = process.cwd();
  const absPath = `${rootDir}/src/extensions/${pluginName}${path}`;
  return absPath;
};

export const getExtensionsFileDefaultExport = async (path: string) => {
  return (await import(getPathToExtensionsFile(path))).default;
};
