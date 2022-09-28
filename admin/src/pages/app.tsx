/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import { NotFound } from "@strapi/helper-plugin";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { pluginBasePath } from "../utils/plugin";
import { HomePage } from "./";
import { NewCronJobPage } from "./cron-jobs/create";

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
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
