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
        // endpoint: `http://hdvn.tv/api/phim-x-${espisodeID}.html`,
        headers: {
          'X-Formatter': 'jsonapi',
          'Content-Type': 'application/json',
        },
        endpoint: `http://hdvn.tv/ajax/loadep/10661`,
        method: 'POST',
        body: JSON.stringify({
          epid: '10661',
        })
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
