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
    <StackNavigation initialRoute={Router.getRoute('dashboard')} />
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
