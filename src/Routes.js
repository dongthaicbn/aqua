import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { routes, TOKEN } from './utils/constants/constants';
import { isEmpty } from './utils/helpers/helpers';
import Login from './view/login/Login';
import Solution from './view/solution/Solution';

const Routes = (props) => {
  if (isEmpty(cookie.get(TOKEN)) && props.location.pathname !== routes.LOGIN) {
    return <Redirect to={routes.LOGIN} />;
  }
  return (
    <Switch>
      <Redirect exact from="/" to={routes.SOLUTION} />
      <Route exact path={routes.SOLUTION} component={Solution} />
      <Route exact path={routes.LOGIN} component={Login} />
    </Switch>
  );
};

export default withRouter(Routes);
