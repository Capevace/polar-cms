import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import withProps from './components/higher-order/withProps';
import store from './reducers/store';

import App from './containers/App';

// Media
import MediaListPage from './containers/media/MediaListPage';

// Posts
import PostListPage from './containers/posts/PostListPage';
import PostEditPage from './containers/posts/PostEditPage';

const history = syncHistoryWithStore(browserHistory, store);

export default (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={() => <a className="btn" href="/dashboard">Go to Dashboard</a>} />
      <Route path="dashboard" component={App}>
        <Route path="media">
          <IndexRoute component={MediaListPage} />
        </Route>

        <Route path="posts">
          <Route path=":postType">
            <IndexRoute component={PostListPage} />
            <Route
              path="create"
              component={
                withProps(PostEditPage, {
                  mode: 'create',
                })
              }
            />
            <Route
              path="edit/:postId"
              component={
                withProps(PostEditPage, {
                  mode: 'edit',
                })
              }
            />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
);
