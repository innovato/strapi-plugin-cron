import { CronJob, CronJobInputData } from "../../../types";
import axiosInstance from "../utils/axiosInstance";
import { pluginName } from './../../../utils/plugin';

export const cron = {
  async getAllCronJobs() {
    return axiosInstance.get<CronJob[]>(`/${pluginName}/cron-jobs`);
  },
  async getCronJob(id: number) {
    return axiosInstance.get<CronJob>(`/${pluginName}/cron-jobs/${id}`);
  },
  async createNewCronJob(data: CronJobInputData) {
    return axiosInstance.post(`/${pluginName}/cron-jobs`, data);
  },
  async updateCronJob(id: number, data: Partial<CronJobInputData>) {
    return axiosInstance.put(`/${pluginName}/cron-jobs/${id}`, data);
  },
  async publishCronJob(id: number) {
    return axiosInstance.put(`/${pluginName}/cron-jobs/publish/${id}`);
  },
  async unpublishCronJob(id: number) {
    return axiosInstance.put(`/${pluginName}/cron-jobs/unpublish/${id}`);
  },
  async deleteCronJob(id: number) {
    return axiosInstance.delete(`/${pluginName}/cron-jobs/${id}`);
  },
};
