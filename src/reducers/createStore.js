import {
  createNavigationEnabledStore,
  NavigationReducer,
} from '@exponent/ex-navigation';
import {
  combineReducers,
  createStore,
} from 'redux';
import Details from '../containers/Details/state';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    ...Details,
  })
);

export default store;
