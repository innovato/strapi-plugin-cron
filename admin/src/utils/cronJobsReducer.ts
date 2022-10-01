import { cron } from "../api/cron";

// type ReducerState = CronJobEntry[];

// type ReducerAction = {
//   type: "init" | "enable" | "disable";
//   initData?: CronJob[];
//   cronJob?: CronJobEntry;
// };

export function cronJobsReducer(cronJobs, action) {
  if (action.type === "init") {
    return action.data.map((cronJobData) => ({
      ...cronJobData,
      enabled: !!cronJobData.publishedAt,
    }));
  }

  let newCronJobs = [...cronJobs];
  const { cronJob } = action;
  const index = cronJobs.findIndex((el) => el.id === cronJob.id);

  switch (action.type) {
    case "enable":
      cron.updateCronJob(cronJob.id, {
        publishedAt: new Date().toISOString(),
      });
      // use response data to update current cron job
      newCronJobs[index] = {
        ...cronJobs[index],
        enabled: true,
      };
      break;
    case "disable":
      cron.updateCronJob(cronJob.id, {
        publishedAt: null,
      });
      // use response data to update current cron job
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
