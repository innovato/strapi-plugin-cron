import { CronJob, NewCronJobData } from "../../../types";
import axiosInstance from "../utils/axiosInstance";

export const cron = {
  async getAllCronJobs() {
    return axiosInstance.get<CronJob[]>("/cron/cron-jobs");
  },
  async createNewCronJob(data: NewCronJobData) {
    return axiosInstance.post(`/cron/cron-jobs`, data);
  },
  async updateCronJob(id: number, data: Partial<CronJob>) {
    return axiosInstance.put(`/cron/cron-jobs/${id}`, data);
  },
  async publishCronJob(id: number) {
    return axiosInstance.put(`/cron/cron-jobs/publish/${id}`);
  },
  async unpublishCronJob(id: number) {
    return axiosInstance.put(`/cron/cron-jobs/unpublish/${id}`);
  },
};
