"use strict";

const server = require("./dist/server");
const schedule = require("node-schedule");

module.exports = {
  ...server.default,
  async bootstrap({ strapi }) {
    const service = await strapi
      .plugin("cronjob-manager")
      .service("myService")
      .getWelcomeMessage();
    console.log(service);
    const job = schedule.scheduleJob("* * * * * *", function () {
      console.log("🚀");
    });
  },
};
