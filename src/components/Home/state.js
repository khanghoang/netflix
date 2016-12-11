import { makeFetchAction } from 'redux-api-call';
import { createSelector } from 'reselect';
import { flow, get } from 'lodash/fp';

const {
  actionCreator: fetchHighlightMovies,
  isFetchingSelector: isFetchingHighlightMoviesSelector,
  dataSelector: rawHighlightMoviesSelector,
} = makeFetchAction(
  'HIGHLIGHT_MOVIES',
  () => ({
    endpoint: 'http://hdvn.tv/api/collect/phim-de-cu.html',
  }),
);

const highlightMoviesSelector = flow(rawHighlightMoviesSelector, get('response'));

const {
  actionCreator: fetchHotMovies,
  isFetchingSelector: isFetchingHotMoviesSelector,
  dataSelector: rawHotMoviesSelector,
} = makeFetchAction(
  'HOT_MOVIES',
  () => ({
    endpoint: 'http://hdvn.tv/api/collect/phim-chieu-rap.html',
  }),
);

const hotMoviesSelector = flow(rawHotMoviesSelector, get('response'));

const HighOrderHomeFetchMovies = ({ name, url }) => {
  const {
    actionCreator,
    isFetchingSelector,
    dataSelector: rawDataSelector,
  } = makeFetchAction(
    name,
    () => ({
      endpoint: url,
    }),
  );

  return {
    actionCreator,
    isFetchingSelector,
    dataSelector: flow(rawDataSelector, get('response')),
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

