export type CronJob = {
  id: number;
  publishedAt: string | null;
  name: string;
  schedule: string;
  isPathToScriptOptChecked: boolean;
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
  | "isPathToScriptOptChecked"
  | "pathToScript"
  | "script"
  | "iterations"
  | "startDate"
  | "endDate"
>;
