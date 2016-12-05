import React, { Component } from 'react';
import {
  Modal,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import { compose, withState } from 'recompose';

const { width, height } = Dimensions.get('window');

const Player = ({ isVisible, setVisible }) => (
  <Modal
    animation="fade"
    visible={isVisible}
  >
    <View
      style={{
        left: -(height - width) / 2,
        top: (height - width) / 2,
        height: width,
        width: height,
        transform: [{
          rotate: '90deg',
        }],
      }}
    >
      <StatusBar
        barStyle="light-content"
        hidden
      />
      <Video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        source={{
          uri: "https://redirector.googlevideo.com/videoplayback?requiressl=yes&id=df36087b6715b21b&itag=22&source=webdrive&ttl=transient&app=explorer&ip=113.161.94.162&ipbits=8&expire=1480942908&sparams=requiressl%2Cid%2Citag%2Csource%2Cttl%2Cip%2Cipbits%2Cexpire&signature=B8E4E0C6F40E77A5F433EEC038D0DF01F7826F0A.334B5573DA3CD4DBBC8EECF0DE686AEB051A4B51&key=ck2&mm=31&mn=sn-8qj-nboez&ms=au&mt=1480928280&mv=m&pl=26?title=HD/720p"
        }}
        rate={1.0}
        volume={1.0}
        muted={false}
        paused={false}
        resizeMode="cover"
        repeat={false}
        playInBackground={false}
        playWhenInactive={false}
        progressUpdateInterval={250.0}
        onEnd={() => { setVisible(false); }}
      />
      <TouchableOpacity
        onPress={() => { setVisible(false); }}
        style={{
          height: 50,
          width: 50,
          position: 'absolute',
          backgroundColor: 'green',
          top: 0,
          right: 0,
        }}
      />
    </View>
  </Modal>
);

const EnhancedPlayer = compose(
  withState('isVisible', 'setVisible', true),
)(Player);

export default class EnhancedPlayerClass extends Component {
  render() {
    return <EnhancedPlayer />
  }
}
