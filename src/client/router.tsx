import React, { SFC } from 'react';
import { DefaultLayout, ErrorPage } from './layout';
import Workspace from './esp/workspace/WorkspaceContainer';
import BlotterContainer from './esp/blotter/BlotterContainer';
import OrderContainer from './order/OrderContainer';
import { Router, Redirect } from 'react-router-dom';
import { Switch } from 'react-router';
import history from './history';

const BodyLayout = ({ props }) => {
  return (
    <div>
      <Workspace {...props} />
      <BlotterContainer {...props} />
    </div>
  );
};

export const MainRouter: SFC = () => {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout
          exact
          path="/Workspace"
          component={props => <BodyLayout {...props} />}
        />
        <DefaultLayout exact path="/Order" component={OrderContainer} />
        <Redirect exact from="/" to="/Workspace" />
        <DefaultLayout exact path="/Blotter" component={BlotterContainer} />
        <DefaultLayout
          exact
          path="/Account"
          component={() => <h1>Account </h1>}
        />
        <DefaultLayout
          exact
          path="/Account/SubAccount"
          component={() => <h1>SubAccount </h1>}
        />
        <DefaultLayout component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
