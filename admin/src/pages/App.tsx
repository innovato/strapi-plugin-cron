import { DesignSystemProvider, darkTheme } from '@strapi/design-system';
import { Page } from '@strapi/strapi/admin';
import { Route, Routes } from 'react-router-dom';
import { CronJobDetailsPage } from './CronJobDetailsPage';
import { EditCronJobPage } from './EditCronJobPage';
import { HomePage } from './HomePage';
import { NewCronJobPage } from './NewCronJobPage';

const App = () => {
  return (
    <DesignSystemProvider locale="en-GB" theme={darkTheme}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={`/cron-jobs/create`} element={<NewCronJobPage />} />
        <Route path={`/cron-jobs/edit/:id`} element={<EditCronJobPage />} />
        <Route path={`/cron-jobs/:id`} element={<CronJobDetailsPage />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </DesignSystemProvider>
  );
};

export default App;
