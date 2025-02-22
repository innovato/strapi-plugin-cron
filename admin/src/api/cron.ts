import { CronJob, CronJobInputData } from '../../../types';
import { PLUGIN_ID } from '../../../utils/plugin';
import axios from '../utils/axios';

export const cronApi = {
  async getAllCronJobs() {
    const res = await axios.get<CronJob[]>(`/${PLUGIN_ID}/cron-jobs`);
    return res.data;
  },
  async getCronJob(documentId: string) {
    const res = await axios.get<CronJob>(`/${PLUGIN_ID}/cron-jobs/${documentId}`);
    return res.data;
  },
  async createNewCronJob(data: CronJobInputData) {
    const res = await axios.post(`/${PLUGIN_ID}/cron-jobs`, data);
    return res.data;
  },
  async updateCronJob({
    documentId,
    data,
  }: {
    documentId: string;
    data: Partial<CronJobInputData>;
  }) {
    const res = await axios.put(`/${PLUGIN_ID}/cron-jobs/${documentId}`, data);
    return res.data;
  },
  async publishCronJob(documentId: string) {
    return axios.put(`/${PLUGIN_ID}/cron-jobs/publish/${documentId}`);
  },
  async unpublishCronJob(documentId: string) {
    return axios.put(`/${PLUGIN_ID}/cron-jobs/unpublish/${documentId}`);
  },
  async deleteCronJob(documentId: string) {
    const res = await axios.delete(`/${PLUGIN_ID}/cron-jobs/${documentId}`);
    return res.data;
  },
  async triggerCronJob(documentId: string) {
    return axios.get(`/${PLUGIN_ID}/cron-jobs/trigger/${documentId}`);
  },
};
