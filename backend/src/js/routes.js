import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './reducers/store';

import App from './containers/App';

// Posts
import PostListPage from './containers/posts/PostListPage';
import PostEditPage from './containers/posts/PostEditPage';

const passProps = (passedProps, Component) => {
  return (originalProps) => {
    return (
      <Component {...originalProps} {...passedProps} />
    );
  };
};

const RedirectToDashboard = () => {
  return <a className="btn" href="/dashboard">Go to Dashboard</a>
};

const PreparedCreatePage = passProps({
  mode: 'create'
}, PostEditPage);

const PreparedEditPage = passProps({
  mode: 'edit'
}, PostEditPage);

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={RedirectToDashboard} />
      <Route path='dashboard' component={App}>
        <Route path='posts'>
          <Route path=':postType'>
            <IndexRoute component={PostListPage} />
            <Route path='create' component={PreparedCreatePage} />
            <Route path='edit'>
              <Route path=':postSlug' component={PreparedEditPage}/>
            </Route>
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
);
