import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './reducers/store';

import App from './containers/App';

// Posts
import PostListPage from './containers/posts/PostListPage';
import PostCreatorPage from './containers/posts/PostCreatorPage';

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='dashboard' component={App}>
        <Route path='posts'>
          <Route path=':postType'>
            <IndexRoute component={PostListPage} />
            <Route path='create' component={PostCreatorPage} />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
);
