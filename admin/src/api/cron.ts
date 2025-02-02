import { CronJob, CronJobInputData } from '../../../types';
import { PLUGIN_ID } from '../../../utils/plugin';
import axios from '../utils/axios';

export const cron = {
  async getAllCronJobs() {
    return axios.get<CronJob[]>(`/${PLUGIN_ID}/cron-jobs`);
  },
  async getCronJob(id: number) {
    return axios.get<CronJob>(`/${PLUGIN_ID}/cron-jobs/${id}`);
  },
  async createNewCronJob(data: CronJobInputData) {
    return axios.post(`/${PLUGIN_ID}/cron-jobs`, data);
  },
  async updateCronJob(id: number, data: Partial<CronJobInputData>) {
    return axios.put(`/${PLUGIN_ID}/cron-jobs/${id}`, data);
  },
  async publishCronJob(id: number) {
    return axios.put(`/${PLUGIN_ID}/cron-jobs/publish/${id}`);
  },
  async unpublishCronJob(id: number) {
    return axios.put(`/${PLUGIN_ID}/cron-jobs/unpublish/${id}`);
  },
  async deleteCronJob(id: number) {
    return axios.delete(`/${PLUGIN_ID}/cron-jobs/${id}`);
  },
  async triggerCronJob(id: number) {
    return axios.get(`/${PLUGIN_ID}/cron-jobs/trigger/${id}`);
  },
};
