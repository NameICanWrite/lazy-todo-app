import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import HomePageContainer from '../home'
import {APP_KEYS} from '../common/consts'
import MyTodosContainer from '../my-todos/todos-page.container'
import CreateTodoPage from '../edit-and-create-todo/create-todo'
import EditTodoPage from '../edit-and-create-todo/edit-todo'
import ViewTodoPage from '../view-todo'
import SignUpPage from '../auth/sign-up/sign-up.page'
import UserPageContainer from '../user/user-page.container'
import ResetPasswordPage from '../auth/reset-password/reset-password.page'
import ForgetPasswordPage from '../auth/forget-password/forget-password.page'
import LoginPage from '../auth/login/login.page'
import SignUpSuccessPage from '../auth/sign-up-success/sign-up-success.page'
import ProtectedRoute from '../common/components/protected-route/protected-route.component'
import Nav from '../nav/nav.component'

export const MainRouter = () => (

    <Router>
        <Nav/>
        <Switch>
            <ProtectedRoute exact path={APP_KEYS.ROUTER_KEYS.MY_TODOS}>
                <MyTodosContainer/>
            </ProtectedRoute>
            <Route exact component={() => <Redirect to={APP_KEYS.ROUTER_KEYS.MY_TODOS}/>}
                   path={APP_KEYS.ROUTER_KEYS.ROOT}/>
            <ProtectedRoute exact path={`${APP_KEYS.ROUTER_KEYS.EDIT_TODO}/:id`}>
                <EditTodoPage/>
            </ProtectedRoute>
            <ProtectedRoute exact path={`${APP_KEYS.ROUTER_KEYS.VIEW_TODO}/:id`}>
                <ViewTodoPage/>
            </ProtectedRoute>
            <ProtectedRoute exact path={APP_KEYS.ROUTER_KEYS.CREATE_TODO}>
                <CreateTodoPage/>
            </ProtectedRoute>
            <Route exact component={SignUpPage} path={APP_KEYS.ROUTER_KEYS.SIGNUP}/>
            <Route exact component={LoginPage} path={APP_KEYS.ROUTER_KEYS.LOGIN}/>
            <Route exact component={SignUpSuccessPage} path={`${APP_KEYS.ROUTER_KEYS.SIGNUP_SUCCESS}/:token`}/>
            <Route exact component={UserPageContainer} path={`${APP_KEYS.ROUTER_KEYS.USER}`}/>
            <Route exact component={ForgetPasswordPage} path={`${APP_KEYS.ROUTER_KEYS.FORGET_PASSWORD}`}/>
            <Route exact component={ResetPasswordPage} path={`${APP_KEYS.ROUTER_KEYS.RESET_PASSWORD}`}/>
        </Switch>
    </Router>
)
