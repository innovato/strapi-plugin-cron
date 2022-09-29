import { CronJob } from "../../../../types";
import { Entry } from "./types";

export const getEntries = (cronJobs: CronJob[]): Entry[] => {
  return cronJobs.map((cronJob) => ({
    ...cronJob,
    enabled: !!cronJob.publishedAt,
  }));
};

export function entriesReducer(entries, action) {
  const index = entries.findIndex((el) => el.id === action.entryId);
  let newEntries = [...entries];
  switch (action.type) {
    case "enable":
      // publish cron job
      newEntries[index] = {
        ...entries[index],
        enabled: true,
      };
      break;
    case "disable":
      // unpublish cron job
      newEntries[index] = {
        ...entries[index],
        enabled: false,
      };
      break;
    default:
      throw new Error();
  }
  return newEntries;
}
