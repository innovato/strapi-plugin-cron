import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },
  async getCronJobs() {
    return await strapi.query("plugin::cronjob-manager.cron-job").findMany();
  },
});
