import React from 'react';
import { ScaleLoader } from 'react-spinners';
import { ConnectionStatus } from '../loader/model/serviceStatus';
import classNames from 'classnames';
import * as style from './style.css';

export namespace Loader {
  export interface Props {
    title: string;
    status: string;
    render: () => JSX.Element;
  }

  export interface State {}
}

export class Loader extends React.PureComponent<Loader.Props, Loader.State> {
  constructor(props: Loader.Props, context: any) {
    super(props, context);
  }

  render() {
    const classes = classNames({
      [style.statusCircle]: true,
      [style.moving]: this.props.status === ConnectionStatus.CONNECTED,
      [style.cancelled]: this.props.status !== ConnectionStatus.CONNECTED
    });

    const header = (
      <h4>
        <div className={classes} />
        {this.props.title}
      </h4>
    );

    if (this.props.status === ConnectionStatus.CONNECTED) {
      return (
        <div>
          {header}
          {this.props.render()}
        </div>
      );
    }

    return (
      <div>
        {header}
        <div className={style.loader}>
          <div className={style.loaderContent}>
            <ScaleLoader
              width={8}
              height={50}
              radius={4}
              color={'#3bafda;'}
              loading={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
