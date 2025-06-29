import { Core } from '@strapi/strapi';
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
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
export default _default;
