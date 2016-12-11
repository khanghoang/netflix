import { createAction, handleActions } from 'redux-actions';
import { identity, constant } from 'lodash';
import { getOr } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';

export const fetchEspisodeAction = (espisodeID) => {
  const {
    isFetchingSelector,
    dataSelector,
    actionCreator: fetchEspisode,
  } = makeFetchAction(
    `esposide_${espisodeID}`,
    () => {
      return {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        endpoint: `http://hdvn.tv/ajax/loadep/${espisodeID}`,
        method: 'POST',
        body: `epid=${espisodeID}`,
      };
    }
  );

  return {
    isFetchingEspisode: isFetchingSelector,
    espisodeSelector: dataSelector,
    fetchEspisode,
  };
};

const PLAY_MOVIE = 'PLAY_MOVIE';
const CLOSE_PLAY_MOVIE = 'CLOSE_PLAY_MOVIE';

// export const playMovieWithID = createAction(PLAY_MOVIE, identity);
export const playMovieWithID = (epid) => ({
  type: PLAY_MOVIE,
  payload: epid,
});
export const closePlayer = createAction(CLOSE_PLAY_MOVIE, identity);

const reducer = handleActions({
  [PLAY_MOVIE]: (state, { payload }) => payload,
  [CLOSE_PLAY_MOVIE]: constant(null),
}, null);

export const currentPlayedMovieSelector = getOr(null, 'player');

export default {
  player: reducer,
};
