import { Button, EmptyStateLayout, Main } from '@strapi/design-system';
import { Loader, Plus } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { CronJobsList } from '../components/CronJobsList';
import { Header } from '../components/Header';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCronJobs();
  }, []);

  async function fetchCronJobs() {
    // TODO
    // const { data } = await cron.getAllCronJobs();
    // setCronJobs(data);
    setCronJobs([]);
    setIsLoading(false);
  }

  if (isLoading) return <Loader />;

  return (
    <Main>
      <Header
        title="Cron Jobs"
        as="h1"
        primaryAction={
          <Button
            startIcon={<Plus />}
            onClick={() => navigate(`${pluginBasePath}/cron-jobs/create`)}
          >
            Add new cron job
          </Button>
        }
      />
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
