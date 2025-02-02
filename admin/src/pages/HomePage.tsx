import { EmptyStateLayout, Main } from '@strapi/design-system';
import { Loader } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob } from '../../../types';
import { cron } from '../api/cron';
import { CronJobsList } from '../components/CronJobsList';

const HomePage = () => {
  // const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(true);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCronJobs();
  }, []);

  async function fetchCronJobs() {
    const { data } = await cron.getAllCronJobs();
    setCronJobs(data);
    setIsLoading(false);
  }

  if (isLoading) return <Loader />;

  return (
    <Main>
      {/* <h1>Welcome to {formatMessage({ id: getTranslation('plugin.name') })}</h1> */}
      Cron Jobs
      {/* <BaseHeaderLayout
        title="Cron Jobs"
        as="h2"
        primaryAction={
          <Button
            startIcon={<Plus />}
            onClick={() => navigate(`${pluginBasePath}/cron-jobs/create`)}
          >
            Add new cron job
          </Button>
        }
      /> */}
      <div>
        {cronJobs.length === 0 ? (
          <EmptyStateLayout
            icon={<EmptyDocuments style={{ width: '200px', height: '200px' }} />}
            content="You don't have any cron jobs yet..."
          />
        ) : (
          <CronJobsList cronJobs={cronJobs} fetchCronJobs={fetchCronJobs} />
        )}
      </div>
    </Main>
  );
};

export { HomePage };
