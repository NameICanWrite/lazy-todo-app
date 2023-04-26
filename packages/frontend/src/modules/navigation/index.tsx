import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import MyTodosContainer from '../my-todos';
import CreateTodoPage from '../create-todo';
import EditTodoPage from '../edit-todo';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact component={MyTodosContainer} path={APP_KEYS.ROUTER_KEYS.MY_TODOS} />
      <Route exact component={() => <Redirect to={APP_KEYS.ROUTER_KEYS.MY_TODOS}/>} path={APP_KEYS.ROUTER_KEYS.ROOT} />
      <Route exact component={EditTodoPage} path={`${APP_KEYS.ROUTER_KEYS.EDIT_TODO}/:id`} />
      <Route exact component={CreateTodoPage} path={APP_KEYS.ROUTER_KEYS.CREATE_TODO} />
    </Switch>
  </Router>
);
