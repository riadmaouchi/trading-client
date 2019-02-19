import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../combineReducers';
import { TradeBlotter } from './tradeBlotter/TradeBlotter';
import { TradeBlotterAction } from './actions';
import { bindActionCreators } from 'redux';
import { Loader } from '../../layout/loader/Loader';
import { BlotterState } from './tradeBlotterReducer';

export namespace BlotterContainer {
  export interface Props extends RouteComponentProps<void> {
    blotter: BlotterState;
    actions: typeof TradeBlotterAction;
  }
}

export class BlotterContainer extends React.PureComponent<
  BlotterContainer.Props
> {
  constructor(props: BlotterContainer.Props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.subscribeTradeBlotterConnectionState(
      this.props.blotter.url
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Loader
                  title={'TRADE BLOTTER'}
                  status={this.props.blotter.connectionState}
                  render={() => (
                    <TradeBlotter
                      tradeReports={this.props.blotter.trades}
                      subscribe={this.props.actions.tradeBlotterSubscribe}
                      unsubscribe={
                        this.props.actions
                          .unsubscribeTradeBlotterConnectionState
                      }
                    />
                  )}
                />
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
    blotter: state.blotter
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(TradeBlotterAction as any, dispatch)
  };
}
