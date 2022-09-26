export default [
  {
    method: "GET",
    path: "/cron-jobs",
    handler: "cronJobController.getAll",
    config: {
      policies: [],
      auth: false,
    },
  },
];
