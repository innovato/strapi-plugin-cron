declare const _default: {
    register(app: any): void;
    registerTrads({ locales }: {
        locales: string[];
    }): Promise<{
        data: any;
        locale: string;
    }[]>;
};
export default _default;
