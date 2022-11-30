"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJobSchema = void 0;
const zod_1 = require("zod");
const dateSchema = zod_1.z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date)
        return new Date(arg);
}, zod_1.z.date().min(new Date(), { message: "This date must be in the future" }).optional());
exports.CronJobSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "ZOD This vaule is required" }),
    schedule: zod_1.z.string().min(1, { message: "This vaule is required" }),
    script: zod_1.z.string().min(1, { message: "This vaule is required" }),
    iterations: zod_1.z
        .number()
        .min(-1, { message: "This value must be greater than or equal to -1" })
        .optional(),
    startDate: dateSchema,
    endDate: dateSchema,
});
