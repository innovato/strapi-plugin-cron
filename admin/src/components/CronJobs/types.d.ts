import { CronJob } from "../../../../types";

export type Entry = CronJob & {
  enabled: boolean;
};
