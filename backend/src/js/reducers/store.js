import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import preloading from './preloading';
import postTypes from './postTypes';
import posts from './posts';
import page from './page';
import postList from './postList';
import postEditor from './postEditor';

export default createStore(
  combineReducers({
    preloading,
    postTypes,
    posts,
    page,
    postList,
    postEditor,
  }),
  compose(
    applyMiddleware(thunk),
    (window.devToolsExtension && window.devToolsExtension())
  )
);
