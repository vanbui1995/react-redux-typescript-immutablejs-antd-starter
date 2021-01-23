import React from 'react';
import { NotFoundPage, HomePage } from 'modules/common-pages';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SignInPage } from 'modules/auth';
import DashboardLayoutRoutes from 'modules/dashboard/layout/DashboardLayoutRoutes';
import { ROUTE_PATH } from 'enums';

const Routes = () => (
  <Switch>
    <Route exact path={ROUTE_PATH.LOGIN} component={SignInPage} />
    <Route path={ROUTE_PATH.DASHBOARD} component={DashboardLayoutRoutes} />
    <Redirect from={ROUTE_PATH.HOME} to={ROUTE_PATH.LOGIN} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
