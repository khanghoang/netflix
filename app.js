/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
  NavigationContext,
} from '@exponent/ex-navigation';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Search from './src/components/Search';
import EnhancedMovieDetails from './src/components/Details/MovieDetails';
import store from './src/reducers/createStore';
import EnhancedPlayer from './src/components/Player';
import Dashboard from './src/components/Home';

const Router = createRouter(() => ({
  dashboard: () => Dashboard,
  search: () => Search,
}));

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
  },
};

const DashboardIcon = ({ color }) => (<Icon name="home" size={20} color={color} />);
const SearchIcon = ({ color }) => (<Icon name="magnifying-glass" size={20} color={color} />);
const UserIcon = ({ color }) => (<Icon name="user" size={20} color={color} />);
const renderTitle = (selected, title) => (
  <Text style={{ color: selected ? '#CD1729' : '#919293' }}>{title}</Text>
);

const navigationContext = new NavigationContext({
  router: Router,
  store,
});

export default () => (
  <Provider store={store}>
    <NavigationProvider context={navigationContext}>
      <StatusBar
        barStyle="light-content"
      />
      <TabNavigation
        tabBarColor="#2B2C2D"
        tabBarHeight={50}
        translucent
        tabBarStyle={{
          borderTopWidth: 1,
          borderTopColor: '#2B2C2D',
        }}
        id="main"
        navigatorUID="main"
        initialTab="dashboard"
      >
        <TabItem
          id="dashboard"
          title="Home"
          renderTitle={renderTitle}
          renderIcon={(selected) => <DashboardIcon color={selected ? '#CD1729' : '#919293'} />}
        >
          <StackNavigation
            id="dashboard"
            initialRoute={Router.getRoute('dashboard')}
          />
        </TabItem>
        <TabItem
          id="search"
          title="Search"
          renderTitle={renderTitle}
          renderIcon={(selected) => <SearchIcon color={selected ? '#CD1729' : '#919293'} />}
        >
          <StackNavigation
            id="search"
            initialRoute={Router.getRoute('search')}
          />
        </TabItem>
        <TabItem
          id="settings"
          title="User"
          renderTitle={renderTitle}
          renderIcon={(selected) => <UserIcon color={selected ? '#CD1729' : '#919293'} />}
        >
          <StackNavigation
            id="search"
            initialRoute={Router.getRoute('dashboard')}
          />
        </TabItem>
      </TabNavigation>
      <EnhancedMovieDetails />
      <EnhancedPlayer />
    </NavigationProvider>
  </Provider>
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 70,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 7,
    backgroundColor: '#171819',
  },
});
