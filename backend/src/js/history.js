import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';

import store from './reducers/store';

export default syncHistoryWithStore(
  useRouterHistory(createHistory)(),
  store
);
