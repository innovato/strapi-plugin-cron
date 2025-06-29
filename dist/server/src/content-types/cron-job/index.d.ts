declare const _default: {
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
export default _default;
