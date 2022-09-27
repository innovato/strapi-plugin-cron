/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { NotFound } from "@strapi/helper-plugin";
import React from "react";
import { Route, Switch } from "react-router-dom";
import pluginId from "../pluginId";
import { HomePage } from "./";

const App: React.FunctionComponent = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
