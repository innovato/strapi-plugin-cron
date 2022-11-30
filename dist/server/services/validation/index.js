"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
exports.default = {
    validateCronJobData(data) {
        const omitProps = {};
        data.executeScriptFromFile
            ? (omitProps["script"] = true)
            : (omitProps["pathToScript"] = true);
        const validation = schema_1.CronJobSchema.omit(omitProps).safeParse(data);
        if (!validation.success) {
            return { errors: validation["error"].issues };
        }
        return { errors: null };
    },
};
