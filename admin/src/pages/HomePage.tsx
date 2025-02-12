import { Button, EmptyStateLayout } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import { Page } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cron } from '../api/cron';
import { CronJobsList } from '../components/CronJobsList';
import { PageLayout } from '../components/PageLayout';

const HomePage = () => {
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

  if (isLoading) return <Page.Loading />;

  return (
    <PageLayout title="Cron Jobs">
      {cronJobs.length === 0 ? (
        <EmptyStateLayout
          icon={<EmptyDocuments style={{ width: '200px', height: '200px' }} />}
          content="You don't have any cron jobs yet..."
          action={
            <Button
              startIcon={<Plus />}
              onClick={() => navigate(`${pluginBasePath}/cron-jobs/create`)}
            >
              Add new cron job
            </Button>
          }
        />
      ) : (
        <CronJobsList cronJobs={cronJobs} fetchCronJobs={fetchCronJobs} />
      )}
    </PageLayout>
  );
};

export { HomePage };
