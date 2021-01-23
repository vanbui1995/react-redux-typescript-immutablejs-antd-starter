import React from 'react';
import { NotFoundPage, HomePage } from 'modules/common-pages';
import { Switch, Route } from 'react-router-dom';
import { SignInPage } from 'modules/auth';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={SignInPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
