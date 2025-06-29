import { z } from 'zod';
export declare const CronJobSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    schedule: z.ZodString;
    executeScriptFromFile: z.ZodBoolean;
    pathToScript: z.ZodString;
    script: z.ZodString;
    iterationsLimit: z.ZodNumber;
    startDate: z.ZodEffects<z.ZodDate, Date, unknown>;
    endDate: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    schedule?: string;
    executeScriptFromFile?: boolean;
    pathToScript?: string;
    script?: string;
    iterationsLimit?: number;
    startDate?: Date;
    endDate?: Date;
}, {
    name?: string;
    schedule?: string;
    executeScriptFromFile?: boolean;
    pathToScript?: string;
    script?: string;
    iterationsLimit?: number;
    startDate?: unknown;
    endDate?: unknown;
}>, {
    name?: string;
    schedule?: string;
    executeScriptFromFile?: boolean;
    pathToScript?: string;
    script?: string;
    iterationsLimit?: number;
    startDate?: Date;
    endDate?: Date;
}, {
    name?: string;
    schedule?: string;
    executeScriptFromFile?: boolean;
    pathToScript?: string;
    script?: string;
    iterationsLimit?: number;
    startDate?: unknown;
    endDate?: unknown;
}>;
