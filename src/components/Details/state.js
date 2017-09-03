import { createAction, handleActions } from 'redux-actions';
import { identity, constant } from 'lodash';
import { flow, noop, getOr } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';

const SHOW_DETAILS = 'SHOW_DETAILS';
const HIDE_DETAILS = 'HIDE_DETAILS';

const HOCMakeFetchAction = movieID => {
  const {
    actionCreator: fetchMovieDetails,
    isFetchingSelector: isFetching,
    dataSelector,
  } = makeFetchAction(`movie_${movieID}`, () => ({
    endpoint: `https://api.themoviedb.org/3/movie/${movieID}?api_key=eb32a449fa8baebded9cd3b02bc0fef4&language=en-US`,
  }));

  return {
    fetchMovieDetails,
    isFetching,
    dataSelector: flow(dataSelector),
    espisodesSelector: flow(dataSelector, getOr([], 'response.episodes')),
  };
};

export { HOCMakeFetchAction };

export const showDetails = createAction(SHOW_DETAILS, identity);
export const hideDetails = createAction(HIDE_DETAILS, identity);
const reducer = handleActions(
  {
    [SHOW_DETAILS]: (state, { payload }) => parseInt(payload, 10),
    [HIDE_DETAILS]: constant(false),
  },
  false
);

export const isShowPopupDetail = getOr(false, 'isShowPopupDetail');
export const selectedMovieDetails = state => {
  const movieID = isShowPopupDetail(state);
  const { dataSelector } = HOCMakeFetchAction(movieID);
  return dataSelector(state);
};

export default {
  isShowPopupDetail: reducer,
};
