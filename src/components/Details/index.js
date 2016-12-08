import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  showDetails,
  hideDetails,
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

const PlayButton = ({ playMovieWithID: openPlayer }) => (
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
    <TouchableOpacity onPress={() => openPlayer(1)} >
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
    null,
    ({
      playMovieWithID,
    })
  )
)(PlayButton);

const TopFeatureImage = () => (
  <View style={{ height: 270 }}>
    <View style={{ height: 270 }} >
      <Image
        style={{ flex: 1 }}
        source={{
          uri: 'https://image.tmdb.org/t/p/w1066_and_h600_bestv2/qCqGdMqt4YUeNijzuISH8NVLyjM.jpg',
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

const MoviesDescription = () => (
  <Text
    style={{
      fontSize: 14,
      color: '#BCBDBE',
      padding: 10,
    }}
  >
    The gritty drama charts the exploits of Viking Hero Ragnar Lothbork
    as he extends the Norse reach by challenging an unfit leader who lacks
    vision
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
    Casts: {casts} Khang Hoang, Quang
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

const MovieDetails = () => (
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: '#161718',
    }}
  >
    <TopFeatureImage />
    <MoviesDescription />
    <CastsText />
    <Actions />
  </ScrollView>
);

/* eslint-disable */
export default class DetailsView extends Component {
  render() {
    return <MovieDetails />
  }
};
/* eslint-enable */
