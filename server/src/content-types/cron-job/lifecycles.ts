import { CronJob } from '../../../../types';

export default {
  afterUpdate({ result: cronJob }: { result: CronJob }) {},
  afterDelete({ result: cronJob }: { result: CronJob }) {},
};
