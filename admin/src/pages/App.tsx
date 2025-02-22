import { DesignSystemProvider, darkTheme } from '@strapi/design-system';
import { Page } from '@strapi/strapi/admin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import { EditCronJobPage } from './EditCronJobPage';
import { HomePage } from './HomePage';
import { NewCronJobPage } from './NewCronJobPage';
import { ViewCronJobPage } from './ViewCronJobPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DesignSystemProvider locale="en-GB" theme={darkTheme}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={`/cron-jobs/create`} element={<NewCronJobPage />} />
          <Route path={`/cron-jobs/edit/:documentId`} element={<EditCronJobPage />} />
          <Route path={`/cron-jobs/:documentId`} element={<ViewCronJobPage />} />
          <Route path="*" element={<Page.Error />} />
        </Routes>
      </DesignSystemProvider>
    </QueryClientProvider>
  );
};

export default App;
