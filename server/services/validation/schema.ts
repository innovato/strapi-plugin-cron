import { z } from "zod";

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date().min(new Date(), { message: "This date must be in the future" }).optional());

export const CronJobSchema = z.object({
  name: z.string().min(1, { message: "This vaule is required" }),
  schedule: z.string().min(1, { message: "This vaule is required" }),
  script: z.string().min(1, { message: "This vaule is required" }),
  iterations: z
    .number()
    .min(-1, { message: "This value must be greater than or equal to -1" })
    .optional(),
  startDate: dateSchema,
  endDate: dateSchema,
});
