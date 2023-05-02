import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import MyTodosContainer from '../my-todos/todos-page.container';
import CreateTodoPage from '../edit-and-create-todo/create-todo';
import EditTodoPage from '../edit-and-create-todo/edit-todo';
import ViewTodoPage from '../view-todo';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact component={MyTodosContainer} path={APP_KEYS.ROUTER_KEYS.MY_TODOS} />
      <Route exact component={() => <Redirect to={APP_KEYS.ROUTER_KEYS.MY_TODOS}/>} path={APP_KEYS.ROUTER_KEYS.ROOT} />
      <Route exact component={EditTodoPage} path={`${APP_KEYS.ROUTER_KEYS.EDIT_TODO}/:id`} />
      <Route exact component={ViewTodoPage} path={`${APP_KEYS.ROUTER_KEYS.VIEW_TODO}/:id`} />
      <Route exact component={CreateTodoPage} path={APP_KEYS.ROUTER_KEYS.CREATE_TODO} />
    </Switch>
  </Router>
);
