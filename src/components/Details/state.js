import { createAction, handleActions } from 'redux-actions';
import { identity, constant } from 'lodash';
import { flow, getOr } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';

const SHOW_DETAILS = 'SHOW_DETAILS';
const HIDE_DETAILS = 'HIDE_DETAILS';

const HOCMakeFetchAction = (movieID) => {
  const {
    actionCreator: fetchMovieDetails,
    isFetchingSelector: isFetching,
    dataSelector,
  } = makeFetchAction(
    `movie_${movieID}`,
    () => ({
      endpoint: `http://hdvn.tv/api/phim-x-${movieID}.html`,
    }),
  );

  return {
    fetchMovieDetails,
    isFetching,
    dataSelector: flow(dataSelector, getOr({ movie: {} }, 'response.movie[0]')),
  };
};

export { HOCMakeFetchAction };

export const showDetails = createAction(SHOW_DETAILS, identity);
export const hideDetails = createAction(HIDE_DETAILS, identity);
const reducer = handleActions({
  [SHOW_DETAILS]: (state, { payload }) => parseInt(payload, 10),
  [HIDE_DETAILS]: constant(false),
}, false);

export const isShowPopupDetail = getOr(false, 'isShowPopupDetail');

export default {
  isShowPopupDetail: reducer,
};
