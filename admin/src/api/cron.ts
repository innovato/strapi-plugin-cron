import axiosInstance from "../utils/axiosInstance";

export const cron = {
  async getAllCronJobs() {
    const data = await axiosInstance.get("/cron/cron-jobs");
    return data;
  },
};
