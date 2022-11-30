"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pluginExtensions_1 = require("../utils/pluginExtensions");
const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
const getCronJobTask = async (cronJob) => {
    return cronJob.isPathToScriptOptChecked
        ? await (0, pluginExtensions_1.getExtensionsFileDefaultExport)(cronJob.pathToScript)
        : new AsyncFunction(cronJob.script);
};
process.argv;
console.log("🚀 ~ file: task.ts ~ line 14 ~ process.argv", process.argv);
