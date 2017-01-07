import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import MovieCell from './MovieCell';
import {
  showDetails,
} from '../Details/state';

const EnhancedMovieCell = compose(
  connect(
    null,
    ({
      onPress: showDetails,
    })
  )
)(MovieCell);

const MovieCells = ({ movies = [] }) => {
  const movieCells = movies.map(movie =>
    <EnhancedMovieCell
      key={movie.movie_id}
      movie={movie}
    />
  );
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 200,
      }}
    >
      {movieCells}
    </View>
  );
};

export default ({ headerText = "Popuplar", isFetching, movies, titleStyle = {} }) => (
  <View
    style={{
      flex: 1,
    }}
  >
    <View
      style={{
        marginTop: 23,
        marginBottom: 5,
        height: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <Text
          style={[
            {
              color: 'white',
              fontWeight: '600',
              fontSize: 16,
              flex: 1,
            },
            titleStyle,
          ]}
        >
          {headerText}
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              width: 100,
              color: 'white',
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            See more >
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
      /> : <MovieCells movies={movies} />
    }
  </View>
);
