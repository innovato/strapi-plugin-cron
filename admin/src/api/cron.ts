import { CronJob, CronJobInputData } from "../../../types";
import axiosInstance from "../utils/axiosInstance";

export const cron = {
  async getAllCronJobs() {
    return axiosInstance.get<CronJob[]>("/cron/cron-jobs");
  },
  async createNewCronJob(data: CronJobInputData) {
    return axiosInstance.post(`/cron/cron-jobs`, data);
  },
  async updateCronJob(id: number, data: Partial<CronJobInputData>) {
    return axiosInstance.put(`/cron/cron-jobs/${id}`, data);
  },
  async publishCronJob(id: number) {
    return axiosInstance.put(`/cron/cron-jobs/publish/${id}`);
  },
  async unpublishCronJob(id: number) {
    return axiosInstance.put(`/cron/cron-jobs/unpublish/${id}`);
  },
  async deleteCronJob(id: number) {
    return axiosInstance.delete(`/cron/cron-jobs/${id}`);
  },
};
