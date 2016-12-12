import React, { Component } from 'react';
import { ScrollView, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const CloseButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <Icon name="ios-close" size={40} color="white" />
  </TouchableOpacity>
);

const EnhancedCloseButton = compose(
  connect(
    null,
    null,
  )
)(CloseButton);

const SeasonCell = ({ title, isSelected }) => (
  <TouchableOpacity
    style={{
      paddingHorizontal: 20,
    }}
  >
    <View
      style={{
        borderTopWidth: 4,
        borderTopColor: isSelected ? '#C80814' : 'transparent',
      }}
    >
      <Text
        style={{
          paddingTop: 10,
          fontSize: 16,
          color: '#E5E6E7',
          fontWeight: isSelected ? '600' : '300',
        }}
      >
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

const ListSeries = ({ listSeries }) => {
  const seriesCells = listSeries.map(series => <SeasonCell isSelected title={series} />);
  return (
    <ScrollView
      style={{ flex: 1, height: 60, backgroundColor: 'transparent', }}
      horizontal
    >
      {seriesCells}
    </ScrollView>
  );
}

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
    <View
      style={{ flex: 1, flexDirection: 'row', }}
    >
      <ListSeries listSeries={['SEASON 1', 'SEASON 2', 'SEASON 3']} />
      <EnhancedCloseButton />
    </View>
  </View>
);

export default class SeriesClass extends Component {
  render() {
    return <Series />
  }
}
