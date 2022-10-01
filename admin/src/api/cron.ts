import { CronJob } from "../../../types";
import axiosInstance from "../utils/axiosInstance";

export const cron = {
  async getAllCronJobs() {
    const res = await axiosInstance.get("/cron/cron-jobs");
    return res.data;
  },
  async updateCronJob(id: number, data: Partial<CronJob>) {
    const res = await axiosInstance.put(`/cron/cron-jobs/${id}`, data);
    return res.data;
  },
};
