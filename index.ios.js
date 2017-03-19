/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

require('es6-symbol/implement');
import 'babel-polyfill';
import {
  AppRegistry,
} from 'react-native';
import App from './app';

AppRegistry.registerComponent('netflix', () => App);
