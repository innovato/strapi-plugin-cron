export default [
  {
    method: 'GET',
    path: '/cron-jobs',
    handler: 'cronJobController.getAll',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/cron-jobs/:documentId',
    handler: 'cronJobController.getOne',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/cron-jobs',
    handler: 'cronJobController.create',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/cron-jobs/:documentId',
    handler: 'cronJobController.update',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/cron-jobs/publish/:documentId',
    handler: 'cronJobController.publish',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/cron-jobs/unpublish/:documentId',
    handler: 'cronJobController.unpublish',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/cron-jobs/:documentId',
    handler: 'cronJobController.delete',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/cron-jobs/trigger/:documentId',
    handler: 'cronJobController.trigger',
    config: {
      policies: [],
      auth: false,
    },
  },
];
