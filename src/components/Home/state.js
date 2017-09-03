import { makeFetchAction } from 'redux-api-call';
import { createSelector } from 'reselect';
import { flow, get } from 'lodash/fp';

const {
  actionCreator: fetchHighlightMovies,
  isFetchingSelector: isFetchingHighlightMoviesSelector,
  dataSelector: rawHighlightMoviesSelector,
} = makeFetchAction('HIGHLIGHT_MOVIES', () => ({
  endpoint:
    'https://api.themoviedb.org/3/movie/upcoming?api_key=eb32a449fa8baebded9cd3b02bc0fef4&language=en-US&page=1',
}));

const highlightMoviesSelector = flow(
  rawHighlightMoviesSelector,
  get('results')
);

const {
  actionCreator: fetchHotMovies,
  isFetchingSelector: isFetchingHotMoviesSelector,
  dataSelector: rawHotMoviesSelector,
} = makeFetchAction('HOT_MOVIES', () => ({
  endpoint:
    'https://api.themoviedb.org/3/movie/top_rated?api_key=eb32a449fa8baebded9cd3b02bc0fef4&language=en-US&page=1',
}));

const hotMoviesSelector = flow(rawHotMoviesSelector, get('results'));

const HighOrderHomeFetchMovies = ({ name }) => {
  const {
    actionCreator,
    isFetchingSelector,
    dataSelector: rawHotMoviesSelector,
  } = makeFetchAction(name, () => ({
    endpoint: `https://api.themoviedb.org/3/movie/${name}?api_key=eb32a449fa8baebded9cd3b02bc0fef4&language=en-US&page=1`,
  }));

  const dataSelector = flow(rawHotMoviesSelector, get('results'));

  return {
    actionCreator,
    isFetchingSelector,
    dataSelector,
  };
};

export {
  fetchHighlightMovies,
  isFetchingHighlightMoviesSelector,
  highlightMoviesSelector,
  fetchHotMovies,
  isFetchingHotMoviesSelector,
  hotMoviesSelector,
  HighOrderHomeFetchMovies,
};
