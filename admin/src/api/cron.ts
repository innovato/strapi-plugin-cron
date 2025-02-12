import { CronJob, CronJobInputData } from '../../../types';
import { PLUGIN_ID } from '../../../utils/plugin';
import axios from '../utils/axios';

export const cron = {
  async getAllCronJobs() {
    return axios.get<CronJob[]>(`/${PLUGIN_ID}/cron-jobs`);
  },
  async getCronJob(documentId: string) {
    return axios.get<CronJob>(`/${PLUGIN_ID}/cron-jobs/${documentId}`);
  },
  async createNewCronJob(data: CronJobInputData) {
    return axios.post(`/${PLUGIN_ID}/cron-jobs`, data);
  },
  async updateCronJob(documentId: string, data: Partial<CronJobInputData>) {
    return axios.put(`/${PLUGIN_ID}/cron-jobs/${documentId}`, data);
  },
  async publishCronJob(documentId: string) {
    return axios.put(`/${PLUGIN_ID}/cron-jobs/publish/${documentId}`);
  },
  async unpublishCronJob(documentId: string) {
    return axios.put(`/${PLUGIN_ID}/cron-jobs/unpublish/${documentId}`);
  },
  async deleteCronJob(documentId: string) {
    return axios.delete(`/${PLUGIN_ID}/cron-jobs/${documentId}`);
  },
  async triggerCronJob(documentId: string) {
    return axios.get(`/${PLUGIN_ID}/cron-jobs/trigger/${documentId}`);
  },
};
