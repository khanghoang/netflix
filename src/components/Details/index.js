import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
  Animated,
} from 'react-native';
import { AndroidBackButtonBehavior } from '@exponent/ex-navigation';
import { batchActions } from 'redux-batched-actions';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { flow, getOr, identity } from 'lodash/fp';
import { get } from 'lodash';
import {
  compose,
  branch,
  renderComponent,
  withProps,
  withState,
} from 'recompose';
import { connect } from 'react-redux';
import { close } from '@khanghoang/redux-modal';
import {
  showDetails,
  hideDetails,
  isShowPopupDetail as selectedMovieID,
  HOCMakeFetchAction,
} from '../Details/state';
import { playMovieWithID } from '../Player/state';

const CLOSE_DETAILS_POPUP_THREDHOLD = -80;

const { height, width } = Dimensions.get('window');

const CloseButton = ({ onPress }) =>
  <TouchableOpacity onPress={onPress}>
    <Icon name="ios-close-circle-outline" size={40} color="white" />
  </TouchableOpacity>;

const EnhancedCloseButton = compose(
  connect(null, dispatch => ({
    onPress: () => {
      dispatch(
        batchActions([
          hideDetails(),
          close('MovieDetails'),
        ])
      );
    },
  })
))(CloseButton);

const PlayButton = ({ episode, playMovieWithID }) =>
  <TouchableOpacity
    onPress={() => {
      playMovieWithID(episode);
    }}
  >
    <View
      style={{
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          paddingLeft: 5,
        }}
        name="ios-play"
        size={50}
        color="white"
      />
    </View>
  </TouchableOpacity>;

const EnhancedPlayButton = compose(
  connect(
    state => {
      const movieID = selectedMovieID(state);
      const { espisodesSelector } = HOCMakeFetchAction(movieID);
      return {
        episode: flow(espisodesSelector, getOr(null, '[0].episode_id'))(state),
      };
    },
    {
      playMovieWithID,
    }
  )
)(PlayButton);

const TopFeatureImage = ({ source, height = 270 }) =>
  <Animated.View style={{ height: height }}>
    <Animated.View style={{ flex: 1 }}>
      <Animated.Image
        style={{
          backgroundColor: 'black',
          flex: 1,
        }}
        source={{
          uri: `https://image.tmdb.org/t/p/w300${source}`,
        }}
      />
    </Animated.View>
  </Animated.View>;

const MoviesDescription = ({ text = '' }) =>
  <Text
    style={{
      fontSize: 14,
      color: '#BCBDBE',
      padding: 10,
    }}
  >
    {text}
  </Text>;

const CastsText = ({ casts }) =>
  <Text
    style={{
      fontSize: 13,
      paddingHorizontal: 10,
      color: '#8B8C8D',
    }}
  >
    Casts: {casts}
  </Text>;

const AddToPlaylist = () =>
  <View
    style={{
      height: 70,
      width: 50,
      alignItems: 'center',
    }}
  >
    <TouchableOpacity>
      <View>
        <Icon
          style={{ textAlign: 'center' }}
          name="ios-add-outline"
          size={30}
          color="#E5E6E7"
        />
        <Text
          style={{
            fontSize: 12,
            color: '#727374',
          }}
        >
          My List
        </Text>
      </View>
    </TouchableOpacity>
  </View>;

const Share = () =>
  <View
    style={{
      height: 70,
      width: 50,
      alignItems: 'center',
      paddingTop: 5,
    }}
  >
    <TouchableOpacity>
      <View>
        <Icon
          style={{ textAlign: 'center' }}
          name="ios-share-outline"
          size={25}
          color="#E5E6E7"
        />
        <Text
          style={{
            fontSize: 12,
            color: '#727374',
          }}
        >
          Share
        </Text>
      </View>
    </TouchableOpacity>
  </View>;

const Actions = ({ onLayout }) =>
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingTop: 20,
    }}
    onLayout={onLayout}
  >
    <AddToPlaylist />
    <View style={{ padding: 10 }} />
    <Share />
  </View>;

const MovieDetails = ({
  movie = {},
  hideDetails: hideMovideDetailsPopup,
  handleScroll = () => {},
  topImageHeight,
}) => {
  const story = get(movie, 'overview', '');
  const backgroundImageURI = get(movie, 'backdrop_path', '');
  const actorString = get(movie, 'actor', '');
  return (
    <AndroidBackButtonBehavior
      isFocused
      onBackButtonPress={() => Promise.resolve(hideMovideDetailsPopup())}
    >
      <View
        style={{
          width,
          height,
          backgroundColor: '#161718',
        }}
      >
        <TopFeatureImage source={backgroundImageURI} height={topImageHeight} />
        <Animated.ScrollView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onScroll={handleScroll}
          scrollEventThrottle={Platform.OS === 'ios' ? 16 : null}
        >
          <View
            style={{
              width,
              height: 270,
              top: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <EnhancedPlayButton />
          </View>
          <LinearGradient
            style={{ height: 100, left: 0, right: 0, top: -100 }}
            colors={['transparent', '#161718']}
          />
          <View
            style={{
              top: -100,
              backgroundColor: '#161718',
            }}
          >
            <MoviesDescription text={story} />
            <CastsText cast={actorString} />
            <Actions />
          </View>
        </Animated.ScrollView>
        <View
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <EnhancedCloseButton />
        </View>
      </View>
    </AndroidBackButtonBehavior>
  );
};

const FullscreenLoader = () =>
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: '#161718',
    }}
  >
    <ActivityIndicator
      animating
      style={{
        height: 165,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      size="large"
    />
  </ScrollView>;

@connect(null, dispatch => ({
    hideDetails: () => {
      dispatch(
        batchActions([
          hideDetails(),
          close('MovieDetails'),
        ])
      );
    },
  }))
@branch(
  ({ isFetching }) => isFetching,
  renderComponent(FullscreenLoader),
  identity
)
class MovieDetailsWithAnimationTopImage extends Component {
  constructor(props) {
    super(props);
    this.topAnimation = new Animated.ValueXY({ x: 0, y: 270 });
  }

  handleScroll = ({ nativeEvent }) => {
    const { contentOffset: { y: offsetY } } = nativeEvent;
    this.topAnimation.setValue({ x: 0, y: -offsetY + 270 });
    if (offsetY < CLOSE_DETAILS_POPUP_THREDHOLD) {
      this.props.hideDetails();
    }
  };

  render() {
    return (
      <MovieDetails
        {...this.props}
        topImageHeight={this.topAnimation.getLayout().top}
        handleScroll={this.handleScroll}
      />
    );
  }
}

/* eslint-disable */
export default class DetailsView extends Component {
  render() {
    return <MovieDetailsWithAnimationTopImage {...this.props} />;
  }
}
/* eslint-enable */
