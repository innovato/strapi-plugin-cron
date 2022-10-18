/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import { NotFound } from "@strapi/helper-plugin";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { CronJobDetails } from "../../components/CronJobDetails";
import { pluginBasePath } from "../../utils/plugin";
import { EditCronJobPage } from "../EditCronJobPage";
import { HomePage } from "../HomePage";
import { NewCronJobPage } from "../NewCronJobPage";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route path={`${pluginBasePath}`} component={HomePage} exact />
        <Route
          path={`${pluginBasePath}/cron-jobs/create`}
          component={NewCronJobPage}
          exact
        />
        <Route
          path={`${pluginBasePath}/cron-jobs/edit`}
          component={EditCronJobPage}
          exact
        />
        <Route
          path={`${pluginBasePath}/cron-jobs/:id`}
          component={CronJobDetails}
          exact
        />
        <Route component={NotFound} />
      </Switch>
      {/* default redirect */}
      {/* <Route path={`${pluginBasePath}`}>
        <Redirect to={`${pluginBasePath}`} />
      </Route> */}
    </>
  );
};

export default App;
