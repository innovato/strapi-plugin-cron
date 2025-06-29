import { CronJob, CronJobInputData } from '../../../types';
import type { Core } from '@strapi/strapi';
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    initialize: () => Promise<void>;
    updateSchedule: (cronJob: CronJob) => Promise<void>;
    validateData: (data: CronJobInputData) => {
        errors: import("zod").ZodIssue[];
    };
    cancel: (cronJob: CronJob) => Promise<void>;
    trigger: (cronJob: CronJob) => Promise<void>;
};
export default _default;
