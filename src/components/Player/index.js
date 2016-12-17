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
import { compose, withState } from 'recompose';
import { flow, getOr, isNumber } from 'lodash/fp';
import { connect } from 'react-redux';
import {
  closePlayer,
  currentPlayedMovieSelector,
  fetchEspisodeAction,
  updateDuration,
  updateProgress,
  isPausedSelector,
  isOpenEpisodesSelector,
  seekerProgressSelector,
} from './state';
import {
  HeaderComponent,
  ControllerComponent,
} from './PlayerController';
import Series from './Series';

const { width, height } = Dimensions.get('window');

const Player = ({
  isVisible,
  closePlayer,
  isFetching = true,
  contentURL = '',
  updateDuration,
  updateProgress,
  isPaused,
  isOpenEpisodes,
  progress,
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
          source={{ uri: contentURL }}
          rate={1.0}
          volume={1.0}
          muted={false}
          paused={isPaused}
          resizeMode="cover"
          repeat={false}
          onLoad={e => { updateDuration(e.duration); }}
          onProgress={e => { updateProgress(e.currentTime); }}
          playInBackground={false}
          playWhenInactive={false}
          progressUpdateInterval={250.0}
          onEnd={closePlayer}
        />
        <HeaderComponent />
        <ControllerComponent progress={progress}/>
        <Modal
          animation="fade"
          visible={isOpenEpisodes}
          style={{
            flex: 1,
          }}
        >
          <Series />
        </Modal>
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
        isPaused: isPausedSelector(state),
        isOpenEpisodes: isOpenEpisodesSelector(state),
      };
    },
    ({
      closePlayer,
      updateDuration,
    }),
  ),
  withState('progress', 'updateProgress', null)
)(Player);

/* eslint-disable */
@connect(
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
      isPaused: isPausedSelector(state),
      isOpenEpisodes: isOpenEpisodesSelector(state),
      seekerProgress: seekerProgressSelector(state),
    };
  },
  ({
    closePlayer,
    updateDuration,
  }),
)
@withState('progress', 'updateProgress', null)
export default class EnhancedPlayerClass extends Component {
  componentWillReceiveProps({ seekerProgress }) {
    if (seekerProgress && this.videoPlayer && isNumber(seekerProgress)) {
      console.log('seekerProgress: ', seekerProgress);
      this.videoPlayer.seek(seekerProgress);
    }
  }
  render() {
    const {
      isVisible,
      closePlayer,
      isFetching = true,
      contentURL = '',
      updateDuration,
      updateProgress,
      isPaused,
      isOpenEpisodes,
      progress,
    } = this.props;
    return (
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
              ref={(ref) => {
                this.videoPlayer = ref;
              }}
              source={{ uri: contentURL }}
              rate={1.0}
              volume={1.0}
              muted={false}
              paused={isPaused}
              resizeMode="cover"
              repeat={false}
              onLoad={e => { updateDuration(e.duration); }}
              onProgress={e => { updateProgress(e.currentTime); }}
              playInBackground={false}
              playWhenInactive={false}
              progressUpdateInterval={250.0}
              onEnd={closePlayer}
            />
            <HeaderComponent />
            <ControllerComponent progress={progress}/>
            <Modal
              animation="fade"
              visible={isOpenEpisodes}
              style={{
                flex: 1,
              }}
            >
              <Series />
            </Modal>
          </View>
        }
      </Modal>
    )
  }
}
/* eslint-enable */
