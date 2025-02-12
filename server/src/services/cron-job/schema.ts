import { z } from 'zod';

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const datePreprocess = (arg: unknown) => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
};

const cronExpressionRegex = /(((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7}/;

const REQUIRED = 'This field is required';
const PAST_DATE = "This date can't be in the past";

export const CronJobSchema = z
  .object({
    name: z.string().min(1, { message: REQUIRED }),
    schedule: z.string().min(1, { message: REQUIRED }).regex(cronExpressionRegex, {
      message: 'This value must be a valid cron expression',
    }),
    pathToScript: z
      .string()
      .min(1, { message: REQUIRED })
      .endsWith('.ts', { message: `This value must end with ".ts"` })
      .startsWith('/', { message: `This value must start with "/"` }),
    script: z.string().min(1, { message: REQUIRED }),
    iterationsLimit: z
      .number()
      .min(-1, { message: 'This value must be greater than or equal to -1' }),
    startDate: z.preprocess(
      datePreprocess,
      z.date({ required_error: REQUIRED }).min(startOfToday(), { message: PAST_DATE })
    ),
    endDate: z.preprocess(
      datePreprocess,
      z.date({ required_error: REQUIRED }).min(startOfToday(), { message: PAST_DATE })
    ),
  })
  .refine((data) => (data.startDate && data.endDate ? data.endDate >= data.startDate : true), {
    message: 'End date cannot be earlier than start date',
    path: ['endDate'],
  });
