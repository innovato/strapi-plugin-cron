import { CronJob, CronJobInputData } from '../../../types';
import { PLUGIN_ID } from '../../../utils/plugin';
import axiosInstance from '../utils/axios';

export const cron = {
  async getAllCronJobs() {
    return axiosInstance.get<CronJob[]>(`/${PLUGIN_ID}/cron-jobs`);
  },
  async getCronJob(id: number) {
    return axiosInstance.get<CronJob>(`/${PLUGIN_ID}/cron-jobs/${id}`);
  },
  async createNewCronJob(data: CronJobInputData) {
    return axiosInstance.post(`/${PLUGIN_ID}/cron-jobs`, data);
  },
  async updateCronJob(id: number, data: Partial<CronJobInputData>) {
    return axiosInstance.put(`/${PLUGIN_ID}/cron-jobs/${id}`, data);
  },
  async publishCronJob(id: number) {
    return axiosInstance.put(`/${PLUGIN_ID}/cron-jobs/publish/${id}`);
  },
  async unpublishCronJob(id: number) {
    return axiosInstance.put(`/${PLUGIN_ID}/cron-jobs/unpublish/${id}`);
  },
  async deleteCronJob(id: number) {
    return axiosInstance.delete(`/${PLUGIN_ID}/cron-jobs/${id}`);
  },
  async triggerCronJob(id: number) {
    return axiosInstance.get(`/${PLUGIN_ID}/cron-jobs/trigger/${id}`);
  },
};
