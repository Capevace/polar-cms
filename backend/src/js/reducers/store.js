import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import preloading from './preloading';
import postTypes from './postTypes';
import posts from './posts';
import page from './page';

export default createStore(
  combineReducers({
    preloading,
    postTypes,
    posts,
    page
  }),
  compose(
    applyMiddleware(thunk),
    // window.devToolsExtension && window.devToolsExtension()
  )
);
