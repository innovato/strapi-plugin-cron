"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async getPublished() {
        return await strapi.query("plugin::cronjob-manager.cron-job").findMany({
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
        });
    },
});
