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
  {
    method: "PUT",
    path: "/cron-jobs/:id",
    handler: "cronJobController.update",
    config: {
      policies: [],
    },
  },
];
