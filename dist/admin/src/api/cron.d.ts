import { CronJob, CronJobInputData } from '../../../types';
export declare const cronApi: {
    getAllCronJobs(): Promise<CronJob[]>;
    getCronJob(documentId: string): Promise<CronJob>;
    createNewCronJob(data: CronJobInputData): Promise<any>;
    updateCronJob({ documentId, data, }: {
        documentId: string;
        data: Partial<CronJobInputData>;
    }): Promise<any>;
    publishCronJob(documentId: string): Promise<import("axios").AxiosResponse<any, any>>;
    unpublishCronJob(documentId: string): Promise<import("axios").AxiosResponse<any, any>>;
    deleteCronJob(documentId: string): Promise<any>;
    triggerCronJob(documentId: string): Promise<any>;
};
