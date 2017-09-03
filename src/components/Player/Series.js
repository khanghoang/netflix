import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { AndroidBackButtonBehavior } from '@exponent/ex-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { flow, getOr } from 'lodash/fp';
import {
  isFetchingDetailsEpisodes,
  detailsEpisodesSelector,
  fetchDetailsEspisodes,
  closeEpisode,
} from './state';

const { width, height } = Dimensions.get('window');

const CloseButton = ({ onPress, style = {} }) =>
  <TouchableOpacity style={style} onPress={onPress}>
    <Icon name="ios-close" size={40} color="white" />
  </TouchableOpacity>;

const EnhancedCloseButton = compose(
  connect(null, {
    onPress: closeEpisode,
  })
)(CloseButton);

const SeasonCell = ({ title, isSelected }) =>
  <TouchableOpacity
    style={{
      paddingHorizontal: 20,
    }}
  >
    <View
      style={{
        borderTopWidth: 4,
        borderTopColor: isSelected ? '#C80814' : 'transparent',
      }}
    >
      <Text
        style={{
          paddingTop: 10,
          fontSize: 16,
          color: '#E5E6E7',
          fontWeight: isSelected ? '600' : '300',
        }}
      >
        {title}
      </Text>
    </View>
  </TouchableOpacity>;

const ListSeries = ({ listSeries }) => {
  const seriesCells = listSeries.map(series =>
    <SeasonCell
      key={series}
      isSelected={series.toLowerCase() === 'season 1'}
      title={series}
    />
  );
  return (
    <ScrollView
      style={{ flex: 1, height: 60, backgroundColor: 'transparent' }}
      horizontal
    >
      {seriesCells}
    </ScrollView>
  );
};

const StillImage = ({ width = 500, stillPath }) =>
  <Image
    source={{
      uri: `https://image.tmdb.org/t/p/w${width}${stillPath}`,
    }}
    resizeMode="cover"
    style={{
      flex: 1,
      height: 140,
      backgroundColor: 'purple',
    }}
  />;

const PlayButton = ({ episode, playMovieWithID }) =>
  <TouchableOpacity
    onPress={() => {
      playMovieWithID(episode);
    }}
  >
    <View
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
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
          paddingLeft: 0,
        }}
        name="ios-play"
        size={35}
        color="white"
      />
    </View>
  </TouchableOpacity>;

const Episode = ({
  episode: {
    episode_number: episodeNumber,
    overview,
    still_path: stillPath,
    name,
  },
}) =>
  <View
    style={{
      width: 250,
      height: 245,
      marginHorizontal: 5,
    }}
  >
    <View
      style={{
        width: 250,
        height: 140,
      }}
    >
      <StillImage stillPath={stillPath} width={300} />
      <View
        style={{
          width: 250,
          height: 140,
          top: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PlayButton />
      </View>
    </View>
    <Text style={{ paddingTop: 10, paddingBottom: 6, color: '#808182' }}>
      {`${episodeNumber}. ${name}`}
    </Text>
    <Text style={{ color: '#979899' }}>
      {overview}
    </Text>
  </View>;

const ListEpisides = ({ isFetching, episodes = [] }) => {
  if (isFetching) {
    return (
      <ActivityIndicator
        animating
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#171819',
        }}
        size="large"
        color="white"
      />
    );
  }

  const listEposides = episodes.map(e => <Episode key={e.id} episode={e} />);

  return (
    <ScrollView style={{ flex: 1 }} horizontal>
      {listEposides}
    </ScrollView>
  );
};

const ConnectedListEpisodes = compose(
  connect(
    state => ({
      isFetching: isFetchingDetailsEpisodes(state),
      episodes: flow(detailsEpisodesSelector, getOr([], 'episodes'))(state),
    }),
    {
      fetchDetailsEspisodes,
    }
  )
)(ListEpisides);

const Series = ({ closeEpisode }) =>
  <AndroidBackButtonBehavior
    isForcused
    onBackButtonPress={() => Promise.resolve(closeEpisode())}
  >
    <View
      style={{
        left: -(height - width) / 2,
        top: (height - width) / 2,
        height: width,
        width: height,
        transform: [
          {
            rotate: '90deg',
          },
        ],
        backgroundColor: '#131415',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <View style={{ paddingTop: 20, height: 60 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <ListSeries listSeries={['SEASON 1', 'SEASON 2', 'SEASON 3']} />
            <EnhancedCloseButton
              style={{
                marginRight: 20,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}
        >
          <ConnectedListEpisodes />
        </View>
      </View>
    </View>
  </AndroidBackButtonBehavior>;

const ConnectedSeries = compose(
  connect(null, {
    closeEpisode,
  })
)(Series);

/* eslint-disable */
export default class SeriesClass extends Component {
  render() {
    return <ConnectedSeries />;
  }
}
