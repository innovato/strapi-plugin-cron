"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensionsFileDefaultExport = exports.getPathToExtensionsFile = void 0;
const getPathToExtensionsFile = (path) => {
    const rootDir = process.cwd();
    console.log("🚀 ~ file: getPathToExtensionsFile.ts ~ line 3 ~ getPathToExtensionsFile ~ rootDir", rootDir);
    const absPath = `${rootDir}/src/extensions/cron${path}.ts`;
    return absPath;
};
exports.getPathToExtensionsFile = getPathToExtensionsFile;
// export const importExtensionsFile = async (path: string) => {
//   return await import(getPathToExtensionsFile(path));
// };
const getExtensionsFileDefaultExport = async (path) => {
    return (await Promise.resolve().then(() => __importStar(require((0, exports.getPathToExtensionsFile)(path))))).default;
};
exports.getExtensionsFileDefaultExport = getExtensionsFileDefaultExport;
