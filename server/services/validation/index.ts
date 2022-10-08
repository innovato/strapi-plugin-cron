import { futureDate, isRequired, minValue, validate } from "./utils";

export default {
  validateCronJobData(data) {
    const validationRules = {
      name: [isRequired],
      schedule: [isRequired],
      script: [isRequired],
      iterations: [minValue(-1)],
      startDate: [futureDate],
      endDate: [futureDate],
    };
    const errors = validate(data, validationRules);
    return { errors };
  },
};
