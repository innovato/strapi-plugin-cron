export type CronJob = {
  id: number;
  publishedAt: string | null;
  name: string;
  schedule: string;
  executeScriptFromFile: boolean;
  pathToScript: string;
  script: string;
  iterationsLimit: number;
  iterationsCount: number;
  startDate: string | null;
  endDate: string | null;
  latestExecutionLog: string[][];
};

export type CronJobInputData = Pick<
  CronJob,
  | "name"
  | "schedule"
  | "executeScriptFromFile"
  | "pathToScript"
  | "script"
  | "iterationsLimit"
  | "startDate"
  | "endDate"
>;
