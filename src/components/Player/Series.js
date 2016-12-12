import React, { Component } from 'react';
import {
  Dimensions,
  View, Text, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const Series = () => (
  <View
    style={{
      left: -(height - width) / 2,
      top: (height - width) / 2,
      height: width,
      width: height,
      transform: [{
        rotate: '90deg',
      }],
      backgroundColor: '#131415',
    }}
  >
  </View>
);

export default class SeriesClass extends Component {
  render() {
    return <Series />
  }
}
