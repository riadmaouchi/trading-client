import React from 'react';
import { Link } from 'react-router-dom';

export namespace Breadcrumb {
  export interface Props {
    path: string;
  }
}

export class Breadcrumb extends React.PureComponent<Breadcrumb.Props> {
  constructor(props: Breadcrumb.Props, context?: any) {
    super(props, context);
  }

  createBreadcrumbs = routes => {
    const matches = [];
    routes
      .replace(/\/$/, '')
      .split('/')
      .reduce((previous, current) => {
        const pathSection = `${previous}/${current}`;
        matches.push({
          pathSection: pathSection,
          match: pathSection === routes,
          name: /[^/]*$/.exec(pathSection)[0]
        });
        return pathSection;
      });
    return matches;
  };

  render() {
    const { path } = this.props;
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb float-right">
          {this.createBreadcrumbs(path || '').map((route, index) => {
            return (
              <li key={index} className="breadcrumb-item">
                {route.match ? (
                  route.name
                ) : (
                  <Link
                    className="breadcrumb-item active"
                    to={route.pathSection}
                  >
                    {route.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
}
