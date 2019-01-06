import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export namespace Header {
  export interface Props {}
}

export class Header extends React.PureComponent<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <nav className="navbar navbar-dark navbar-bg fixed-top navbar-expand-md">
        <div className="container">
          <a className="navbar-brand" href="#">
            <FontAwesomeIcon icon="globe" /> Trading System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link scroll-link" to="/Workspace">
                  {' '}
                  <FontAwesomeIcon icon="stream" /> Workspace
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link scroll-link" to="/Order">
                  {' '}
                  <FontAwesomeIcon icon="exchange-alt" /> Order
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link scroll-link" to="/Blotter">
                  {' '}
                  <FontAwesomeIcon icon="table" /> Blotter
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link scroll-link" to="/Account">
                  {' '}
                  <FontAwesomeIcon icon="user" /> Account
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link scroll-link" href="#">
                  <FontAwesomeIcon icon="power-off" /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
