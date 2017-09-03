import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { compose, lifecycle, withProps } from 'recompose';
import { connect } from 'react-redux';
import { flow, take } from 'lodash/fp';
import { MoviesBlock } from '../Movie';
import {
  fetchHighlightMovies,
  isFetchingHighlightMoviesSelector,
  highlightMoviesSelector,
  fetchHotMovies,
  isFetchingHotMoviesSelector,
  hotMoviesSelector,
  HighOrderHomeFetchMovies,
} from './state';

const Dashboard = () =>
  <View style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <HighlightMovieBlock />
      <HotMovieBlock />
      <SeriesMovieBlock />
      <RecentMoviesBlock />
    </ScrollView>
  </View>;

export default class DashboardClass extends Component {
  render() {
    return <Dashboard />;
  }
}

const HighlightMovieBlock = compose(
  withProps(props => ({
    ...props,
    headerText: 'Up coming',
  })),
  connect(
    state => ({
      isFetching: isFetchingHighlightMoviesSelector(state),
      movies: flow(highlightMoviesSelector)(state),
    }),
    {
      fetchHighlightMovies,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchHighlightMovies();
    },
  })
)(MoviesBlock);

const HotMovieBlock = compose(
  withProps(props => ({
    ...props,
    headerText: 'Top rated',
  })),
  connect(
    state => ({
      isFetching: isFetchingHotMoviesSelector(state),
      movies: flow(hotMoviesSelector)(state),
    }),
    {
      fetchHotMovies,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchHotMovies();
    },
  })
)(MoviesBlock);

const {
  actionCreator: fetchRecentSeries,
  isFetchingSelector: isFetchingRecentSeries,
  dataSelector: seriesSelector,
} = HighOrderHomeFetchMovies({ name: 'popular' });

const SeriesMovieBlock = compose(
  withProps(props => ({
    ...props,
    headerText: 'Popular',
  })),
  connect(
    state => ({
      isFetching: isFetchingRecentSeries(state),
      movies: flow(seriesSelector)(state),
    }),
    {
      fetchRecentSeries,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchRecentSeries();
    },
  })
)(MoviesBlock);

const {
  actionCreator: fetchRecentMovies,
  isFetchingSelector: isFetchingRecentMovies,
  dataSelector: moviesSelector,
} = HighOrderHomeFetchMovies({ name: 'now_playing' });

const RecentMoviesBlock = compose(
  withProps(props => ({
    ...props,
    headerText: 'Playing now',
  })),
  connect(
    state => ({
      isFetching: isFetchingRecentMovies(state),
      movies: flow(moviesSelector)(state),
    }),
    {
      fetchRecentMovies,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchRecentMovies();
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
