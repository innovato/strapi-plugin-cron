import { CronJobSchema } from "./schema";

export default {
  validateCronJobData(data) {
    const validation = CronJobSchema.safeParse(data);
    if (!validation.success) {
      return { errors: validation["error"].issues };
    }
    return { errors: null };
  },
};
