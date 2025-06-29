import React from 'react';
import { CronJob, CronJobInputData } from '../../../types';
type Props = {
    initialData?: CronJob;
    handleSubmit: (data: CronJobInputData) => Promise<any>;
    previewData?: boolean;
};
export declare const CronJobForm: React.FunctionComponent<Props>;
export declare const CronJobFormView: ({ data }: {
    data: CronJob;
}) => import("react/jsx-runtime").JSX.Element;
export {};
