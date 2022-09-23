import { Strapi } from "@strapi/strapi";
import { cron } from "../cron";

export default ({ strapi }: { strapi: Strapi }) => {
  cron.init();
};
