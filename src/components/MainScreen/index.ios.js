import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import {
  createRouter,
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
  NavigationProvider,
  NavigationContext,
} from '@exponent/ex-navigation';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import EnhancedMovieDetails from '../Details/MovieDetails';
import { ModalPortal } from '@khanghoang/redux-modal';
import EnhancedPlayer from '../Player';
// import Dashboard from '../Home';
// import Search from '../Search';
import Router from '../../router';
import store from '../../reducers/createStore';

const navigationContext = new NavigationContext({
  router: Router,
  store,
});

const DashboardIcon = ({ color }) =>
  <Icon name="home" size={20} color={color} />;
const SearchIcon = ({ color }) =>
  <Icon name="magnifying-glass" size={20} color={color} />;
const UserIcon = ({ color }) => <Icon name="user" size={20} color={color} />;
const renderTitle = (selected, title) =>
  <Text style={{ color: selected ? '#CD1729' : '#919293' }}>
    {title}
  </Text>;

// eslint-disable-next-line immutable/no-mutation
export default () =>
  <Provider store={store}>
    <NavigationProvider context={navigationContext}>
      <StatusBar barStyle="light-content" />
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
          renderIcon={selected =>
            <DashboardIcon color={selected ? '#CD1729' : '#919293'} />}
        >
          <StackNavigation
            id="dashboard"
            initialRoute={Router.getRoute('dashboard')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: '#28292A',
                borderBottomWidth: 1,
                borderBottomColor: '#2B2C2D',
                titleStyle: {
                  color: '#E7E8E9',
                },
              },
            }}
          />
        </TabItem>
        <TabItem
          id="search"
          title="Search"
          renderTitle={renderTitle}
          renderIcon={selected =>
            <SearchIcon color={selected ? '#CD1729' : '#919293'} />}
        >
          <StackNavigation
            id="search"
            initialRoute={Router.getRoute('search')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: '#28292A',
                borderBottomWidth: 1,
                borderBottomColor: '#2B2C2D',
                titleStyle: {
                  color: '#E7E8E9',
                },
              },
            }}
          />
        </TabItem>
        <TabItem
          id="settings"
          title="User"
          renderTitle={renderTitle}
          renderIcon={selected =>
            <UserIcon color={selected ? '#CD1729' : '#919293'} />}
        >
          <StackNavigation
            id="search"
            initialRoute={Router.getRoute('dashboard')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: '#28292A',
                borderBottomWidth: 1,
                borderBottomColor: '#2B2C2D',
                titleStyle: {
                  color: '#E7E8E9',
                },
              },
            }}
          />
        </TabItem>
      </TabNavigation>
      <ModalPortal wrapComponent={View} />
      <EnhancedPlayer />
    </NavigationProvider>
  </Provider>;
