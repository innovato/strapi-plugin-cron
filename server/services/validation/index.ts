import { isRequired, validate } from "./utils";

export default {
  validateCronJobData(data) {
    const validationRules = {
      name: [isRequired],
      schedule: [isRequired],
      script: [isRequired],
    };
    const errors = validate(data, validationRules);
    return { errors };
  },
};
