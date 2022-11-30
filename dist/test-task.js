"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (strapi) => {
    const entries = await strapi.entityService.findMany("plugin::cron.cron-job");
    console.log(entries);
};
