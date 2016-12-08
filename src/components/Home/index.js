import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { MoviesBlock } from '../Movie';
import {
  fetchHighlightMovies,
  isFetchingHighlightMoviesSelector,
  highlightMoviesSelector,
  fetchHotMovies,
  isFetchingHotMoviesSelector,
  hotMoviesSelector,
} from './state';

const Dashboard = () => (
  <View style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <HighlightMovieBlock />
      <HotMovieBlock />
      <MoviesBlock />
      <MoviesBlock />
      <MoviesBlock />
    </ScrollView>
  </View>
);

export default class DashboardClass extends Component {
  render() {
    return <Dashboard />;
  }
};

const HighlightMovieBlock = compose(
  connect(
    state => ({
      isFetching: isFetchingHighlightMoviesSelector(state),
      movies: highlightMoviesSelector(state),
    }),
    ({
      fetchHighlightMovies,
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchHighlightMovies();
    },
  })
)(MoviesBlock);

const HotMovieBlock = compose(
  connect(
    state => ({
      isFetching: isFetchingHotMoviesSelector(state),
      movies: hotMoviesSelector(state),
    }),
    ({
      fetchHotMovies,
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchHotMovies();
    },
  })
)(MoviesBlock);

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 70,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 7,
    backgroundColor: '#171819',
  },
});
