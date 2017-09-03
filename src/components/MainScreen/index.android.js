import React from 'react';
import { View, Text } from 'react-native';
import {
  createRouter,
  DrawerNavigation,
  DrawerNavigationItem,
  StackNavigation,
  NavigationProvider,
  NavigationContext,
} from '@exponent/ex-navigation';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import EnhancedMovieDetails from '../Details/MovieDetails';
import EnhancedPlayer from '../Player';
import Dashboard from '../Home';
import Search from '../Search';
import store from '../../reducers/createStore';

const Router = createRouter(() => ({
  dashboard: () => Dashboard,
  search: () => Search,
}));

const navigationContext = new NavigationContext({
  router: Router,
  store,
});

// eslint-disable-next-line immutable/no-mutation
Dashboard.route = {
  navigationBar: {
    title: 'Nextflix',
    backgroundColor: '#28292A',
    borderBottomWidth: 1,
    borderBottomColor: '#2B2C2D',
    titleStyle: {
      color: '#E7E8E9',
    },
    renderRight: () =>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Icon name="magnifying-glass" size={25} color="white" />
      </View>,
  },
};

export default () =>
  <Provider store={store}>
    <NavigationProvider context={navigationContext}>
      <DrawerNavigation
        id="main"
        initialItem="dashboard"
        drawerWidth={300}
        renderHeader={() => <Text>foo</Text>}
      >
        <DrawerNavigationItem id="dashboard" title="Home">
          <StackNavigation
            id="dashboard"
            initialRoute={Router.getRoute('dashboard')}
          />
        </DrawerNavigationItem>

        <DrawerNavigationItem id="settings" title="User">
          <StackNavigation
            id="search"
            initialRoute={Router.getRoute('dashboard')}
          />
        </DrawerNavigationItem>
      </DrawerNavigation>
      <EnhancedMovieDetails />
      <EnhancedPlayer />
    </NavigationProvider>
  </Provider>;
