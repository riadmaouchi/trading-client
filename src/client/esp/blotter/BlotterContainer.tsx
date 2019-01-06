import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../combineReducers';
import { TradeBlotter } from './tradeBlotter/TradeBlotter';
import { TradeBlotterAction } from './actions';
import { bindActionCreators } from 'redux';
import { TradeReport } from '../tile/model/tradeReport';

export namespace BlotterContainer {
  export interface Props extends RouteComponentProps<void> {
    trades: TradeReport[];
    actions: typeof TradeBlotterAction;
  }

  export interface State {}
}

export class BlotterContainer extends React.PureComponent<
  BlotterContainer.Props,
  BlotterContainer.State
> {
  constructor(props: BlotterContainer.Props, context: any) {
    super(props, context);
  }

  componentWillMount() {
    this.props.actions.tradeBlotterSubscribe();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <TradeBlotter tradeReports={this.props.trades} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlotterContainer);

function mapStateToProps(state: RootState) {
  return {
    trades: state.trades
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(TradeBlotterAction as any, dispatch)
  };
}
