import { DesignSystemProvider, darkTheme } from '@strapi/design-system';
import { Page } from '@strapi/strapi/admin';
import { Route, Routes } from 'react-router-dom';
import { EditCronJobPage } from './EditCronJobPage';
import { HomePage } from './HomePage';
import { NewCronJobPage } from './NewCronJobPage';
import { ViewCronJobPage } from './ViewCronJobPage';

const App = () => {
  return (
    <DesignSystemProvider locale="en-GB" theme={darkTheme}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={`/cron-jobs/create`} element={<NewCronJobPage />} />
        <Route path={`/cron-jobs/edit/:documentId`} element={<EditCronJobPage />} />
        <Route path={`/cron-jobs/:documentId`} element={<ViewCronJobPage />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </DesignSystemProvider>
  );
};

export default App;
