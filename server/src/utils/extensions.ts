import { PLUGIN_ID } from '../../../utils/plugin';

const extensionsDirPath = `${process.cwd()}/src/extensions/${PLUGIN_ID}`;

const getFilePath = (path: string) => `${extensionsDirPath}${path}`;

export const getDefaultModuleExport = async (path: string) => {
  return (await import(getFilePath(path))).default;
};
