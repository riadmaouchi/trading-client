import React from 'react';
import { Header } from './Header';
import { Breadcrumb } from './Breadcrumb';
import { Route } from 'react-router-dom';

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      render={matchProps => (
        <div className="DefaultLayout">
          <Header />
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <h4>FX Spot</h4>
                <Breadcrumb path={rest.path} />
              </div>
            </div>
            <Component {...matchProps} />
          </div>
        </div>
      )}
    />
  );
};

export default DefaultLayout;
