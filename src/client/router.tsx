import React, { SFC } from 'react';
import { DefaultLayout, ErrorPage } from './layout';
import WorkspaceContainer from './esp/workspace/WorkspaceContainer';
import BlotterContainer from './esp/blotter/BlotterContainer';
import OrderContainer from './order/OrderContainer';
import { Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { history } from './configureStore';
import { OverflowScroll } from './layout/styles';

const BodyLayout = ({ props }) => {
  return (
    <div>
      <OverflowScroll>
        <WorkspaceContainer {...props} />
      </OverflowScroll>
      <BlotterContainer {...props} />
    </div>
  );
};

export const MainRouter: SFC = () => {
  return (
    <ConnectedRouter history={history}>
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
        <DefaultLayout component={ErrorPage} />
      </Switch>
    </ConnectedRouter>
  );
};

export default MainRouter;
