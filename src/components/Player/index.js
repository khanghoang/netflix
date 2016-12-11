import React, { Component } from 'react';
import {
  Modal,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { compose } from 'recompose';
import { flow, getOr } from 'lodash/fp';
import { connect } from 'react-redux';
import {
  closePlayer,
  currentPlayedMovieSelector,
  fetchEspisodeAction,
} from './state';

const { width, height } = Dimensions.get('window');

const Player = ({
  isVisible,
  closePlayer,
  isFetching = true,
  contentURL = '',
}) => (
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
      {
        isFetching ?
        <ActivityIndicator
          animating
          style={{
            height: 165,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          size="large"
        /> :
        <View>
          <Video
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            source={{
              uri: contentURL,
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
      }
    </View>
  </Modal>
);

const EnhancedPlayer = compose(
  connect(
    state => {
      const {
        isFetchingEspisode,
        espisodeSelector,
      } = fetchEspisodeAction(currentPlayedMovieSelector(state));
      return {
        isVisible: espisodeSelector(state),
        isFetching: isFetchingEspisode(state),
        contentURL: flow(espisodeSelector, getOr('', 'link.l[0]'))(state),
      };
    },
    ({
      closePlayer,
    })
  )
)(Player);

/* eslint-disable */
export default class EnhancedPlayerClass extends Component {
  render() {
    return <EnhancedPlayer />
  }
}
/* eslint-enable */
