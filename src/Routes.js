import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { routes, TOKEN } from './utils/constants/constants';
import { isEmpty } from './utils/helpers/helpers';
import Login from './view/login/Login';
import Map from './view/map/Map';

const Routes = (props) => {
  if (isEmpty(cookie.get(TOKEN)) && props.location.pathname !== routes.LOGIN) {
    return <Redirect to={routes.LOGIN} />;
  }
  return (
    <Switch>
      <Redirect exact from="/" to={routes.MAP} />
      <Route exact path={routes.MAP} component={Map} />
      <Route exact path={routes.LOGIN} component={Login} />
    </Switch>
  );
};

export default withRouter(Routes);
