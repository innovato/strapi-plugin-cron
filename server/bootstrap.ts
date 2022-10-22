import { Strapi } from "@strapi/strapi";
import { cron } from "./cron/index";

export default ({ strapi }: { strapi: Strapi }) => {
  cron.init();
};
