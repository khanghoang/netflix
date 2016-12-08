import {
  createNavigationEnabledStore,
  NavigationReducer,
} from '@exponent/ex-navigation';
import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { reducers as apiReducers, middleware as apiMiddleware } from 'redux-api-call';
import Details from '../components/Details/state';
import Player from '../components/Player/state';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const middlewares = applyMiddleware(
  apiMiddleware(),
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    ...apiReducers,
    ...Details,
    ...Player,
  }),
  {},
  composeEnhancers(
    middlewares,
  ),
);

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  // const bak = global.XMLHttpRequest;
  const xhr = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest :
    global.XMLHttpRequest;

  global.XMLHttpRequest = xhr;
}

export default store;
