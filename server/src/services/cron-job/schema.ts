import { z } from 'zod'

let startOfToday = new Date()
startOfToday.setHours(0, 0, 0, 0)

let endOfToday = new Date()
endOfToday.setHours(23, 59, 59, 999)

const startDateSchema = z.preprocess(
  (arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
  },
  z
    .date()
    .min(startOfToday, { message: "This date can't be in the past" })
    .optional()
)

const endDateSchema = z.preprocess(
  (arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
  },
  z
    .date()
    .min(endOfToday, { message: "This date can't be in the past" })
    .optional()
)

const cronExpressionRegex = /(((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7}/

export const CronJobSchema = z.object({
  name: z.string().min(1, { message: 'This vaule is required' }),
  schedule: z
    .string()
    .min(1, { message: 'This vaule is required' })
    .regex(cronExpressionRegex, {
      message: 'This value must be a valid cron expression',
    }),
  pathToScript: z
    .string()
    .min(1, { message: 'This vaule is required' })
    .endsWith('.ts', { message: `This vaule must end with ".ts"` })
    .startsWith('/', { message: `This vaule must start with "/"` }),
  script: z.string().min(1, { message: 'This vaule is required' }),
  iterationsLimit: z
    .number()
    .min(-1, { message: 'This value must be greater than or equal to -1' })
    .optional(),
  startDate: startDateSchema,
  endDate: endDateSchema,
})
