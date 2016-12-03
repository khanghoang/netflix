/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@exponent/ex-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import MoviesBlock from './src/components/MoviesBlock';

const Router = createRouter(() => ({
  dashboard: () => Dashboard,
}));

const Dashboard = () => (
  <ScrollView
    contentContainerStyle={styles.contentContainer}
    style={styles.container}
  >
    <MoviesBlock />
    <MoviesBlock />
    <MoviesBlock />
    <MoviesBlock />
    <MoviesBlock />
  </ScrollView>
);

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

export default () => (
  <NavigationProvider router={Router}>
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
          initialRoute={Router.getRoute('dashboard')}
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
  </NavigationProvider>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
