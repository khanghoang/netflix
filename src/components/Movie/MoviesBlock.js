import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation } from '@exponent/ex-navigation';
import { open } from '@khanghoang/redux-modal';
import Router from '../../router';
import MovieCell from './MovieCell';
import { showDetails } from '../Details/state';

const EnhancedMovieCell = compose(
  connect(null, dispatch => ({
    onPress: movieID => {
      dispatch(open('MovieDetails'));
      dispatch(showDetails(movieID));
    },
  }))
)(MovieCell);

const MovieCells = ({ movies = [] }) => {
  const movieCells = movies.map(movie =>
    <View
      style={{
        paddingLeft: 4,
        paddingRight: 4,
      }}
    >
      <EnhancedMovieCell key={movie.movie_id} movie={movie} />
    </View>
  );
  return (
    <ScrollView
      horizontal
      style={{
        flex: 1,
        height: 165,
      }}
    >
      {movieCells}
    </ScrollView>
  );
};

const MoviesBlock = ({
  headerText = 'Popuplar',
  isFetching,
  movies,
  titleStyle = {},
  navigator,
}) =>
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
        <TouchableOpacity
          onPress={() => {
            navigator.push(Router.getRoute('CategoryScreen'));
          }}
        >
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
    {isFetching
      ? <ActivityIndicator
          animating
          style={{
            height: 165,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          size="large"
        />
      : <MovieCells movies={movies} />}
  </View>;

export default compose(withNavigation)(MoviesBlock);
