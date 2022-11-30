"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJobSchema = void 0;
const zod_1 = require("zod");
let startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);
let endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);
const startDateSchema = zod_1.z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date)
        return new Date(arg);
}, zod_1.z.date().min(startOfToday, { message: "This date can't be in the past" }).optional());
const endDateSchema = zod_1.z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date)
        return new Date(arg);
}, zod_1.z.date().min(endOfToday, { message: "This date can't be in the past" }).optional());
const cronExpressionRegex = /(((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7}/;
exports.CronJobSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "This vaule is required" }),
    schedule: zod_1.z
        .string()
        .min(1, { message: "This vaule is required" })
        .regex(cronExpressionRegex, {
        message: "This value must be a valid cron expression",
    }),
    pathToScript: zod_1.z
        .string()
        .min(1, { message: "This vaule is required" })
        .endsWith(".ts", { message: `This vaule must end with ".ts"` })
        .startsWith("/", { message: `This vaule must start with "/"` }),
    script: zod_1.z.string().min(1, { message: "This vaule is required" }),
    iterationsLimit: zod_1.z
        .number()
        .min(-1, { message: "This value must be greater than or equal to -1" })
        .optional(),
    startDate: startDateSchema,
    endDate: endDateSchema,
});
