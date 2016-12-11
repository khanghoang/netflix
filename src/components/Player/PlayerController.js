import React, { Component } from 'react';
import {
  View,
  Text,
  ProgressViewIOS ,
} from 'react-native';
import { compose, withState, mapProps } from 'recompose';
import Icon from 'react-native-vector-icons/Ionicons';

const WHITE_COLOR = '#E6E7E8';

const Header = ({}) => (
  <View
    style={{
      height: 40,
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      top: 0,
      right: 0,
      left: 0,
      flex: 1,
      flexDirection: 'row',
    }}
  >
    <CloseButton />
    <Text style={{
      lineHeight: 40,
      color: WHITE_COLOR,
      fontSize: 16,
      backgroundColor: 'transparent',
    }}>Game of thrones</Text>
  </View>
);

const CloseButton = () => (
  <Icon style={{
    backgroundColor: 'transparent',
    paddingHorizontal: 10, paddingVertical: 5 }} name="ios-arrow-back" size={30} color={WHITE_COLOR} />
);

const PlayButton = () => (
  <Icon style={{
    backgroundColor: 'transparent',
    paddingHorizontal: 20, paddingVertical: 5 }} name="ios-play" size={30} color={WHITE_COLOR} />
);

const Seeker = ({ progress, width = 0, setWidth }) => (
  <View
    onLayout={(e) => { setWidth(e.nativeEvent.layout.width); }}
    style={{ paddingVertical: 20, flex: 1 }}
  >
    <View style={{ backgroundColor:"#262728", height: 1 }} />
    <View style={{ top: 20, left: 0, width: progress * width, backgroundColor:"#DE1321", height: 1, position: 'absolute' }} />
    <View style={{ borderRadius: 8, top: 13, left: progress * width, width: 16, height: 16, backgroundColor:"#DE1321", position: 'absolute' }} />
  </View>
);

const EnhancedSeeker = compose(
  mapProps(() => ({
    progress: 0.5,
  })),
  withState('width', 'setWidth', 0),
)(Seeker);

const Timer = ({ text }) => (
  <Text
    style={{
      fontSize: 16,
      width: 80,
      color: WHITE_COLOR,
      paddingHorizontal: 15,
      lineHeight: 40,
      backgroundColor: 'transparent',
    }}
  >
    {text}
  </Text>
);

const Controller = () => (
  <View
    style={{
      height: 40,
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      bottom: 0,
      right: 0,
      left: 0,
      flex: 1,
      flexDirection: 'row',
    }}
  >
    <PlayButton />
    <EnhancedSeeker />
    <Timer />
  </View>
);

class HeaderComponent extends Component {
  render() {
    return <Header />
  }
};

class ControllerComponent extends Component {
  render() {
    return <Controller />
  }
}

export {
  HeaderComponent,
  ControllerComponent,
};
