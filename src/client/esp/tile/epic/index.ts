import { combineEpics } from 'redux-observable';
import { pricingServiceEpic } from './pricingEpic';
import { executionEpic } from './executionEpic';

const epics = [pricingServiceEpic, executionEpic];

export default combineEpics(...epics);
