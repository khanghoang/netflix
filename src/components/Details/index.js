import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { flow, getOr } from 'lodash/fp';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  showDetails,
  hideDetails,
  isShowPopupDetail as selectedMovieID,
  HOCMakeFetchAction,
} from '../Details/state';
import { playMovieWithID } from '../Player/state';

const { width } = Dimensions.get('window');

const CloseButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <Icon name="ios-close-circle-outline" size={40} color="white" />
  </TouchableOpacity>
);

const EnhancedCloseButton = compose(
  connect(
    null,
    ({
      onPress: hideDetails,
    })
  )
)(CloseButton);

const PlayButton = ({
  episode,
  playMovieWithID,
}) => (
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
    <TouchableOpacity
      onPress={() => {
        playMovieWithID(episode);
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
    </TouchableOpacity>
  </View>
);

const EnhancedPlayButton = compose(
  connect(
    state => {
      const movieID = selectedMovieID(state);
      const { espisodesSelector } = HOCMakeFetchAction(movieID);
      return {
        episode: flow(espisodesSelector, getOr(null, '[0].episode_id'))(state),
      };
    },
    ({
      playMovieWithID,
    })
  )
)(PlayButton);

const TopFeatureImage = ({ source: backgroundImageURI }) => (
  <View style={{ height: 270 }}>
    <View style={{ height: 270 }} >
      <Image
        style={{ flex: 1 }}
        source={{
          uri: `http://hdvn.tv/${backgroundImageURI}`,
        }}
      />
      <View
        style={{
          width,
          height: 270,
          top: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <EnhancedPlayButton />
      </View>
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
      <LinearGradient
        style={{ position: 'absolute', height: 100, left: 0, right: 0, bottom: 0 }}
        colors={['transparent', '#161718']}
      />
    </View>
  </View>
);

const MoviesDescription = ({ text = '' }) => (
  <Text
    style={{
      fontSize: 14,
      color: '#BCBDBE',
      padding: 10,
    }}
  >
    {text}
  </Text>
);

const CastsText = ({ casts }) => (
  <Text
    style={{
      fontSize: 13,
      paddingHorizontal: 10,
      color: '#8B8C8D',
    }}
  >
    Casts: {casts}
  </Text>
);

const AddToPlaylist = () => (
  <View
    style={{
      height: 70,
      width: 50,
      alignItems: 'center',
    }}
  >
    <TouchableOpacity>
      <View>
        <Icon style={{ textAlign: 'center' }} name="ios-add-outline" size={30} color="#E5E6E7" />
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
  </View>
);

const Share = () => (
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
        <Icon style={{ textAlign: 'center' }} name="ios-share-outline" size={25} color="#E5E6E7" />
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
  </View>
);

const Actions = ({ onLayout }) => (
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
  </View>
);

const MovieDetails = ({
  movie: {
    story,
    big_img: backgroundImageURI,
    actor: actorString,
  } = {},
  isFetching,
}) => (
  isFetching ?
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
  </ScrollView> :
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: '#161718',
    }}
  >
    <TopFeatureImage source={backgroundImageURI} />
    <MoviesDescription text={story} />
    <CastsText cast={actorString} />
    <Actions />
  </ScrollView>
);

/* eslint-disable */
export default class DetailsView extends Component {
  render() {
    return <MovieDetails {...this.props}/>
  }
};
/* eslint-enable */
