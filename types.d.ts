export type CronJob = {
  id: number;
  publishedAt: string | null;
  name: string;
  schedule: string;
  script: string;
  iterations: number;
  startDate: string | null;
  endDate: string | null;
};

export type NewCronJobPayload = Pick<
  CronJob,
  "name" | "schedule" | "script" | "iterations" | "startDate" | "endDate"
>;
