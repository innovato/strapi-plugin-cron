import { CronJob } from "../../../types";
import axiosInstance from "../utils/axiosInstance";

export const cron = {
  async getAllCronJobs() {
    const res = await axiosInstance.get("/cron/cron-jobs");
    return res.data;
  },
  async update(id: number, data: Partial<CronJob>) {
    const res = await axiosInstance.put(`/cron/cron-jobs/${id}`, data);
    return res.data;
  },
  async publish(id: number) {
    const res = await axiosInstance.put(`/cron/cron-jobs/publish/${id}`);
    return res.data;
  },
  async unpublish(id: number) {
    const res = await axiosInstance.put(`/cron/cron-jobs/unpublish/${id}`);
    return res.data;
  },
};
