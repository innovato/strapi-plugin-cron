declare const _default: {
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
export default _default;
