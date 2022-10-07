import { isRequired, minValue, validate } from "./utils";

export default {
  validateCronJobData(data) {
    const validationRules = {
      name: [isRequired],
      schedule: [isRequired],
      iterations: [minValue(-1)],
      script: [isRequired],
    };
    const errors = validate(data, validationRules);
    return { errors };
  },
};
