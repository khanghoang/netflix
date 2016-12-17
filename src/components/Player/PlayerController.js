import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { noop, constant } from 'lodash';
import {
 selectedMovieDetails,
} from '../Details/state';
import {
  closePlayer,
  durationSelector,
  isPausedSelector,
  playCurrentMovie,
  pauseCurrentMovie,
  openEpisode,
} from './state';

const WHITE_COLOR = '#E6E7E8';

const EpisodeButton = ({ onPress = noop }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 40,
      justifyContent: 'center',
      padding: 10,
      position: 'absolute',
      right: 0,
      top: 5,
    }}
  >
    <MaterialIcons name="playlist-play" color="white" size={30} />
  </TouchableOpacity>
);

const ConnectedEpisodeButton = compose(
  connect(
    null,
    ({
      onPress: openEpisode,
    })
  )
)(EpisodeButton);

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
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <ConnectedCloseButton />
      <ConnectedEpisodeButton />
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
    onPress={closePlayer}
  >
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <Icon
        style={{
          backgroundColor: 'transparent',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
        name="ios-arrow-back"
        size={30}
        color={WHITE_COLOR}
      />
      <ConnectedTitle />
    </View>
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
  <TouchableOpacity
    onPress={play}
  >
    <Icon
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        paddingVertical: 5,
      }}
      name="ios-play"
      size={30}
      color={WHITE_COLOR}
    />
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
    <Icon
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        paddingVertical: 5,
      }}
      name="ios-pause"
      size={30}
      color={WHITE_COLOR}
    />
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

class Seeker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };

  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => {
        console.log('captrue: ');
        return true;
      },
      onMoveShouldSetPanResponderCapture: () => {
        console.log('pan capture: ');
        return true;
      },
      onPanResponderGrant: (e) => {
        console.log('grant: ', grant);
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([ null, {
        dy: this.state.pan.x,
      }]),
      onPanResponderRelease: () => {
        this.state.pan.flattenOffset();
      },
    });
  }

  render() {
    const { setWidth, progress, width } = this.props;
    return (
      <View
        onLayout={(e) => { setWidth(e.nativeEvent.layout.width); }}
        style={{ paddingVertical: 20, flex: 1 }}
      >
        <View style={{ backgroundColor:"#262728", height: 1 }} />
        <View style={{ top: 20, left: 0, width: progress * width, backgroundColor:"#DE1321", height: 1, position: 'absolute' }} />
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            {
              borderRadius: 8,
              top: 13,
              // left: progress * width - 8,
              width: 16,
              height: 16,
              // backgroundColor:"#DE1321",
              backgroundColor:"green",
              position: 'absolute'
            },
            {
              transform: [
                {
                  translateX: this.state.pan.x
                },
                {
                  translateY: this.state.pan.y
                },
              ]
            },
          ]}
        />
      </View>
    )
  }
}

const EnhancedSeeker = compose(
  withState('width', 'setWidth', 0),
  // connect(
  //   (state, { progress }) => {
  //     const duration = durationSelector(state);
  //     const percent = progress / duration;
  //     return {
  //       progress: percent,
  //     };
  //   },
  //   null
  // ),
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
    (state, { progress }) => {
      const duration = durationSelector(state);
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

const Controller = ({ isPaused, progress }) => (
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
    <EnhancedSeeker progress={progress} />
    <ConnectedTimer progress={progress} />
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
    return <ConnectedController {...this.props}/>
  }
}

export {
  HeaderComponent,
  ControllerComponent,
};
