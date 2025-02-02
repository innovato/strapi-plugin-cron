import { Button, EmptyStateLayout, Main } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import { Page } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob } from '../../../types';
import { pluginBasePath } from '../../../utils/plugin';
import { cron } from '../api/cron';
import { BaseHeaderLayout } from '../components/BaseHeaderLayout';
import { ContentLayout } from '../components/ContentLayout';
import { CronJobsList } from '../components/CronJobsList';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCronJobs();
  }, []);

  async function fetchCronJobs() {
    // TODO
    const { data } = await cron.getAllCronJobs();
    console.log('🚀 ~ fetchCronJobs ~ data:', data);
    setCronJobs(data);
    setIsLoading(false);
  }

  if (isLoading) return <Page.Loading />;

  return (
    <Main>
      <BaseHeaderLayout title="Cron Jobs" />
      <ContentLayout>
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
      </ContentLayout>
    </Main>
  );
};

export { HomePage };
