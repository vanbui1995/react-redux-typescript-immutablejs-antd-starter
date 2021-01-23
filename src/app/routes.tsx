import React from 'react';
import { NotFoundPage } from 'modules/common-pages';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SignInPage } from 'modules/auth';
import { DashboardLayout } from 'modules/dashboard';
import { ROUTE_PATH } from 'enums';

const Routes = () => (
  <Switch>
    <Route exact path={ROUTE_PATH.LOGIN} component={SignInPage} />
    <Route path={ROUTE_PATH.DASHBOARD} component={DashboardLayout} />
    <Redirect from={ROUTE_PATH.HOME} to={ROUTE_PATH.LOGIN} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
