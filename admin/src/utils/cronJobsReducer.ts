// type ReducerState = CronJobEntry[];

// type ReducerAction = {
//   type: "init" | "enable" | "disable";
//   initData?: CronJob[];
//   cronJob?: CronJobEntry;
// };

export function cronJobsReducer(cronJobs, action) {
  let newCronJobs = [...cronJobs];
  const index = cronJobs.findIndex((el) => el.id === action.cronJob.id);
  switch (action.type) {
    case "init":
      newCronJobs = action.initData.map((cronJob) => ({
        ...cronJob,
        enabled: !!cronJob.publishedAt,
      }));
      break;
    case "enable":
      // publish cron job
      newCronJobs[index] = {
        ...cronJobs[index],
        enabled: true,
      };
      break;
    case "disable":
      // unpublish cron job
      newCronJobs[index] = {
        ...cronJobs[index],
        enabled: false,
      };
      break;
    default:
      throw new Error();
  }
  return newCronJobs;
}
