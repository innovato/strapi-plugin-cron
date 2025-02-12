export type CronJob = {
  documentId: string;
  id: number;
  publishedAt: string;
  name: string;
  schedule: string;
  executeScriptFromFile: boolean;
  pathToScript: string;
  script: string;
  iterationsLimit: number;
  iterationsCount: number;
  startDate: string;
  endDate: string;
  latestExecutionLog: string[][];
};

export type CronJobInputData = Pick<
  CronJob,
  | 'name'
  | 'schedule'
  | 'executeScriptFromFile'
  | 'pathToScript'
  | 'script'
  | 'iterationsLimit'
  | 'startDate'
  | 'endDate'
>;

export type CronJobInputErrors = { [K in keyof CronJobInputData]?: string | string[] };
