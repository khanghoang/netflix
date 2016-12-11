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
    {
      isFetching ?
        <ActivityIndicator
          animating
          style={{
            height: 165,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#171819',
          }}
          size="large"
          color='white'
        /> :
      <View
        style={{
          left: -(height - width) / 2,
          top: (height - width) / 2,
          height: width,
          width: height,
          transform: [{
            rotate: '90deg',
          }],
          backgroundColor: '#171819',
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
            backgroundColor: '#171819',
          }}
          source={{
            uri: contentURL
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
  </Modal>
);

const EnhancedPlayer = compose(
  connect(
    state => {
      const currentPlayedMovieID = currentPlayedMovieSelector(state);
      const {
        isFetchingEspisode,
        espisodeSelector,
      } = fetchEspisodeAction(currentPlayedMovieID);
      const url = flow(espisodeSelector, getOr(null, 'link.l[0]'))(state);
      return {
        isVisible: currentPlayedMovieSelector(state),
        isFetching: isFetchingEspisode(state),
        contentURL: url,
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
