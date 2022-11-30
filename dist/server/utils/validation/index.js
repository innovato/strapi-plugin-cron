"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCronJobData = void 0;
const schema_1 = require("../../services/validation/schema");
const validateCronJobData = (data) => {
    const validation = schema_1.CronJobSchema.safeParse(data);
    console.log("🚀 ~ file: index.ts ~ line 5 ~ validateCronJobData ~ validation", validation);
    return {};
    if (!validation.success) {
        return { errors: validation["error"].issues };
    }
    return { errors: null };
};
exports.validateCronJobData = validateCronJobData;
