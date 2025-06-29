declare const _default: {
    'cron-job': ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getAll: () => Promise<import("@strapi/types/dist/modules/documents").AnyDocument[]>;
        getOne: (documentId: string) => Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
        getPublished: () => Promise<import("@strapi/types/dist/modules/documents").AnyDocument[]>;
        create: (data: any) => Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
        update: (documentId: string, data: any) => Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
        publish: (documentId: string) => Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
        unpublish: (documentId: string) => Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
        delete: (documentId: string) => Promise<void>;
    };
    cron: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        initialize: () => Promise<void>;
        updateSchedule: (cronJob: import("../../../types").CronJob) => Promise<void>;
        validateData: (data: import("../../../types").CronJobInputData) => {
            errors: import("zod").ZodIssue[];
        };
        cancel: (cronJob: import("../../../types").CronJob) => Promise<void>;
        trigger: (cronJob: import("../../../types").CronJob) => Promise<void>;
    };
};
export default _default;
