import React, { Component } from 'react';
import {
  Modal,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  closePlayer,
  currentPlayedMovieSelector,
} from './state';

const { width, height } = Dimensions.get('window');

const Player = ({ isVisible, closePlayer }) => (
  <Modal
    animation="fade"
    visible={Boolean(isVisible)}
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
          uri: "https://r6---sn-a5mekned.googlevideo.com/videoplayback?requiressl=yes&id=fb79b30acfce7b24&itag=18&source=webdrive&ttl=transient&app=explorer&ip=116.102.230.186&ipbits=32&expire=1481223479&sparams=expire,id,ip,ipbits,itag,mm,mn,ms,mv,nh,pl,requiressl,source,ttl&signature=096F1AFDCE2B00BBF17CF01988DDEF7B2EB1A889.4C340E473CC2EFC3FCD1DD46789145239E49C057&key=cms1&pl=20&safm=0&cm2rm=sn-8pxuuxa-nboll7d,sn-npoer76&req_id=58c14aca444536e2&redirect_counter=2&cms_redirect=yes&mm=34&mn=sn-a5mekned&ms=ltu&mt=1481209020&mv=m&nh=IgpwcjAyLmxheDAyKg43NC4xMjUuMTQ2LjEyNQ"
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
        onEnd={closePlayer}
      />
      <TouchableOpacity
        onPress={closePlayer}
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
  connect(
    state => ({
      isVisible: currentPlayedMovieSelector(state),
    }),
    ({
      closePlayer,
    })
  )
)(Player);

export default class EnhancedPlayerClass extends Component {
  render() {
    return <EnhancedPlayer />
  }
}
