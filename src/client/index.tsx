import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import 'bootstrap';
import '../../public/assets/styles/custom.scss';
import { MainRouter } from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGlobe,
  faStream,
  faPowerOff,
  faUser,
  faCalendarAlt,
  faTable,
  faExchangeAlt,
  faArrowDown,
  faArrowUp,
  faCircle,
  faExclamationCircle,
  faSpinner,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faGlobe,
  faStream,
  faPowerOff,
  faUser,
  faCalendarAlt,
  faTable,
  faExchangeAlt,
  faArrowDown,
  faArrowUp,
  faCircle,
  faExclamationCircle,
  faSpinner,
  faCheckCircle,
  faTimesCircle
);

const store = configureStore();

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}
