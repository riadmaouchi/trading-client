import React from 'react';
import { TileActions } from '../tile/actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../combineReducers';
import { TileData } from '../tile/model/tileData';
import { Workspace } from './Workspace';
export namespace WorkspaceContainer {
  export interface Props extends RouteComponentProps<void> {
    tiles: TileData[];
    actions: typeof TileActions;
  }
}

export class WorkspaceContainer extends React.PureComponent<
  WorkspaceContainer.Props
> {
  constructor(props: WorkspaceContainer.Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 ">
            <Workspace
              tiles={this.props.tiles}
              dismissExecutionNotification={
                this.props.actions.dismissExecutionNotification
              }
              editNotional={this.props.actions.editNotional}
              executeTrade={this.props.actions.executeTrade}
              tileSubscribe={this.props.actions.tileSubscribe}
              tileUnsubscribe={
                this.props.actions.unsubscribePricingConnectionState
              }
              subscribePricingConnectionState={
                this.props.actions.subscribePricingConnectionState
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceContainer);

function mapStateToProps(state: RootState) {
  return {
    tiles: state.tiles
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(TileActions as any, dispatch)
  };
}
