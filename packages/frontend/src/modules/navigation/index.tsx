import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route component={HomePageContainer} path={APP_KEYS.ROUTER_KEYS.ROOT} />
    </Switch>
  </Router>
);
