"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./cron/index");
exports.default = ({ strapi }) => {
    index_1.cron.init();
};
