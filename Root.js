import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ProjectList from './src/Pages/ProjectList'
import Login from './src/Pages/Login'

const NoMatch = ({ location }, props) => {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" render={()=>(<Redirect to="/login" />)} />
      <Route exact path="/home" component={ProjectList} />
      <Route component={NoMatch} />
    </Switch>
    </Router>
  </Provider>
)
export default Root
