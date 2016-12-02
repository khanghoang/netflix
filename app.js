/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@exponent/ex-navigation';
import MoviesBlock from './src/components/MoviesBlock';

const Router = createRouter(() => ({
  dashboard: () => Dashboard,
}));

const Dashboard = () => (
  <ScrollView style={styles.container}>
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
        renderIcon={() => null}
      >
        <StackNavigation
          id="dashboard"
          initialRoute={Router.getRoute('dashboard')}
        />
      </TabItem>
      <TabItem
        id="search"
        title="Search"
        renderIcon={() => null}
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
