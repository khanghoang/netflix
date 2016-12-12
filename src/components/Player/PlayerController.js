import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {
 selectedMovieDetails,
} from '../Details/state';
import {
  closePlayer,
  durationSelector,
  progressSelector,
  isPausedSelector,
  playCurrentMovie,
  pauseCurrentMovie,
} from './state';

const WHITE_COLOR = '#E6E7E8';

const Header = () => (
  <LinearGradient
    colors={['#161718', 'transparent']}
    style={{
      position: 'absolute',
      height: 60,
      top: 0,
      right: 0,
      left: 0,
    }}
  >
    <View
      style={{
        height: 40,
        backgroundColor: 'transparent',
      }}
    >
      <ConnectedCloseButton />
    </View>
  </LinearGradient>
);

const Title = ({ movie: { name_vi: title } }) => (
  <Text
    style={{
      lineHeight: 40,
      color: WHITE_COLOR,
      fontSize: 16,
      backgroundColor: 'transparent',
    }}
  >
    {title}
  </Text>
);

const ConnectedTitle = compose(
  connect(
    state => ({
      movie: selectedMovieDetails(state),
    }),
    null,
  )
)(Title);

const CloseButton = ({ closePlayer }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      flexDirection: 'row',
    }}
    onPress={closePlayer}
  >
    <Icon
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: 10, paddingVertical: 5 }} name="ios-arrow-back" size={30} color={WHITE_COLOR}
      />
    <ConnectedTitle />
  </TouchableOpacity>
);

const ConnectedCloseButton = compose(
  connect(
    null,
    ({
      closePlayer,
    })
  )
)(CloseButton);

const PlayButton = ({ play }) => (
  <TouchableOpacity onPress={play}>
    <Icon style={{
      backgroundColor: 'transparent',
      paddingHorizontal: 20, paddingVertical: 5 }} name="ios-play" size={30} color={WHITE_COLOR} />
  </TouchableOpacity>
);

const ConnectedPlayButton = compose(
  connect(
    null,
    ({
      play: playCurrentMovie,
    })
  )
)(PlayButton);

const PauseButton = ({ pause }) => (
  <TouchableOpacity onPress={pause}>
    <Icon style={{
      backgroundColor: 'transparent',
      paddingHorizontal: 20, paddingVertical: 5 }} name="ios-pause" size={30} color={WHITE_COLOR} />
  </TouchableOpacity>
);

const ConnectedPauseButton = compose(
  connect(
    null,
    ({
      pause: pauseCurrentMovie,
    })
  )
)(PauseButton);

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
  withState('width', 'setWidth', 0),
  connect(
    state => {
      const duration = durationSelector(state);
      const progress = progressSelector(state);
      const percent = progress / duration;
      return {
        progress: percent,
      };
    },
    null
  ),
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

const ConnectedTimer = compose(
  connect(
    state => {
      const duration = durationSelector(state);
      const progress = progressSelector(state);
      const timeLeft = duration - progress;
      const mins = parseInt(timeLeft / 60, 10);
      // eslint-disable-next-line no-mixed-operators
      const secs = parseInt(timeLeft - mins * 60, 10);
      if (mins === 0 && secs === 0) {
        return {
          text: '',
        };
      }
      return {
        text: `${mins}:${secs}`,
      };
    },
    null,
  )
)(Timer);

const Controller = ({ isPaused }) => (
  <LinearGradient
    colors={['transparent', '#161718']}
    style={{
      position: 'absolute',
      height: 60,
      bottom: 0,
      right: 0,
      left: 0,
      flex: 1,
      flexDirection: 'row',
      paddingTop: 20,
    }}
  >
    { isPaused ? <ConnectedPlayButton /> : <ConnectedPauseButton /> }
    <EnhancedSeeker />
    <ConnectedTimer />
  </LinearGradient>
);

const ConnectedController = compose(
  connect(
    state => ({
      isPaused: isPausedSelector(state),
    }),
    null,
  )
)(Controller);

class HeaderComponent extends Component {
  render() {
    return <Header />
  }
};

class ControllerComponent extends Component {
  render() {
    return <ConnectedController />
  }
}

export {
  HeaderComponent,
  ControllerComponent,
};
