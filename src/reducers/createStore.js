import {
  createNavigationEnabledStore,
  NavigationReducer,
} from '@exponent/ex-navigation';
import {
  combineReducers,
  createStore,
} from 'redux';
import Details from '../containers/Details/state';
import Player from '../containers/Player/state';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    ...Details,
    ...Player,
  })
);

export default store;
