export type CronJob = {
  id: number;
  publishedAt: string | null;
  name: string;
  schedule: string;
  executeScriptFromFile: boolean;
  pathToScript: string;
  script: string;
  iterations: number;
  startDate: string | null;
  endDate: string | null;
  iterationsCount: number;
};

export type CronJobInputData = Pick<
  CronJob,
  | "name"
  | "schedule"
  | "executeScriptFromFile"
  | "pathToScript"
  | "script"
  | "iterations"
  | "startDate"
  | "endDate"
>;
