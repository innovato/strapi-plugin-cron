declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
    };
    controllers: {
        cronJobController: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            getAll(ctx: any): Promise<void>;
            getOne(ctx: any): Promise<void>;
            create(ctx: any): Promise<any>;
            update(ctx: any): Promise<any>;
            publish(ctx: any): Promise<void>;
            unpublish(ctx: any): Promise<void>;
            delete(ctx: any): Promise<void>;
            trigger(ctx: any): Promise<void>;
        };
    };
    routes: {
        method: string;
        path: string;
        handler: string;
        config: {
            policies: any[]; /**
             * Plugin server methods
             */
            auth: boolean;
        };
    }[];
    services: {
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
            updateSchedule: (cronJob: import("../../types").CronJob) => Promise<void>;
            validateData: (data: import("../../types").CronJobInputData) => {
                errors: import("zod").ZodIssue[];
            };
            cancel: (cronJob: import("../../types").CronJob) => Promise<void>;
            trigger: (cronJob: import("../../types").CronJob) => Promise<void>;
        };
    };
    contentTypes: {
        'cron-job': {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    description: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    "content-manager": {
                        visible: boolean;
                    };
                    "content-type-builder": {
                        visible: boolean;
                    };
                };
                attributes: {
                    name: {
                        type: string;
                        required: boolean;
                        unique: boolean;
                    };
                    schedule: {
                        type: string;
                        required: boolean;
                    };
                    executeScriptFromFile: {
                        type: string;
                        default: boolean;
                    };
                    pathToScript: {
                        type: string;
                    };
                    script: {
                        type: string;
                    };
                    iterationsLimit: {
                        type: string;
                        min: number;
                        default: number;
                    };
                    iterationsCount: {
                        type: string;
                        default: number;
                    };
                    startDate: {
                        type: string;
                    };
                    endDate: {
                        type: string;
                    };
                    latestExecutionLog: {
                        type: string;
                    };
                    publicationDate: {
                        type: string;
                    };
                };
            };
            lifecycles: {};
        };
    };
    policies: {};
    middlewares: {};
};
export default _default;
