import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes, TOKEN } from './utils/constants/constants';
import { isEmpty } from './utils/helpers/helpers';
import Login from './view/login/Login';
import Map from './view/map/Map';
import UserManagement from './view/userManagement/UserManagement';

const Routes = (props) => {
  if (
    isEmpty(localStorage.getItem(TOKEN)) &&
    props.location.pathname !== routes.LOGIN
  ) {
    return <Redirect to={routes.LOGIN} />;
  }
  return (
    <Switch>
      <Redirect exact from="/" to={routes.MAP.replace(':type', 'admin')} />
      <Route exact path={routes.MAP} component={Map} />
      <Route exact path={routes.USER_MANAGEMENT} component={UserManagement} />
      <Route exact path={routes.LOGIN} component={Login} />
    </Switch>
  );
};

export default withRouter(Routes);
