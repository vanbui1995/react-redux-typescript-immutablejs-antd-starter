import { ROUTE_PATH } from 'enums';
import { HomePage } from 'modules/common-pages';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export default function DashboardRoutes() {
  return (
    <Switch>
      <Route exact path={ROUTE_PATH.DASHBOARD} component={HomePage} />
      <Redirect to={ROUTE_PATH.DASHBOARD} />
    </Switch>
  );
}
