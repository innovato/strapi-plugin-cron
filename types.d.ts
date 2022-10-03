export type CronJob = {
  id: number;
  name: string;
  schedule: string;
  script: string;
  iterations: number;
  publishedAt: string | null;
};

export type NewCronJobData = Pick<CronJob, "name" | "schedule" | "script"> & {
  iterations: number | null;
};
