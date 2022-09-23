export type CronJob = {
  id: number;
  name: string;
  schedule: string;
  script: string;
  publishedAt: string | null;
};
