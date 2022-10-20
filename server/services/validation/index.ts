import { CronJobSchema } from "./schema";

export default {
  validateCronJobData(data) {
    const omitProps = {};
    data.isPathToScriptOptChecked
      ? (omitProps["script"] = true)
      : (omitProps["pathToScript"] = true);

    const validation = CronJobSchema.omit(omitProps).safeParse(data);
    if (!validation.success) {
      return { errors: validation["error"].issues };
    }
    return { errors: null };
  },
};
