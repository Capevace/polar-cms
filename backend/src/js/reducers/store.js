import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';


import preloading from './preloading';
import page from './page';
import alertList from './alertList';

// Posts
import postTypes from './postTypes';
import postList from './postList';
import postEditor from './postEditor';

// Media
import mediaList from './mediaList';

export default createStore(
  combineReducers({
    preloading,
    page,
    alertList,
    postTypes,
    postList,
    postEditor,
    mediaList,
    routing: routerReducer,
  }),
  compose(
    applyMiddleware(thunk),
    (window.devToolsExtension && window.devToolsExtension())
  )
);
