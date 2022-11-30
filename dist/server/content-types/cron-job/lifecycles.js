"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../cron/index");
exports.default = {
    afterUpdate({ result: cronJob }) {
        index_1.cron.updateJob(cronJob);
    },
    afterDelete({ result: cronJob }) {
        index_1.cron.deleteJob(cronJob);
    },
};
