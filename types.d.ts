export type CronJob = {
  id: number;
  documentId: string;
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
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
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
