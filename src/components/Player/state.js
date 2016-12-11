import { createAction, handleActions } from 'redux-actions';
import { identity, constant } from 'lodash';
import { getOr } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';
import { combineReducers } from 'redux';

export const fetchEspisodeAction = (espisodeID) => {
  const {
    isFetchingSelector: isFetchingEspisode,
    dataSelector: espisodeSelector,
    actionCreator: fetchEspisode,
  } = makeFetchAction(
    `esposide_${espisodeID}`,
    () => ({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      endpoint: `http://hdvn.tv/ajax/loadep/${espisodeID}`,
      method: 'POST',
      body: `epid=${espisodeID}`,
    })
  );

  return {
    isFetchingEspisode,
    espisodeSelector,
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

const currentEpisodeReducer = handleActions({
  [PLAY_MOVIE]: (state, { payload }) => payload,
  [CLOSE_PLAY_MOVIE]: constant(null),
}, null);

const UPDATE_DURATION = 'UPDATE_DURATION';

const duration = handleActions({
  [UPDATE_DURATION]: (state, { payload }) => payload,
  [CLOSE_PLAY_MOVIE]: constant(0),
}, 0);

export const updateDuration = createAction(UPDATE_DURATION, identity);

const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

const progress = handleActions({
  [UPDATE_PROGRESS]: (state, { payload }) => payload,
  [CLOSE_PLAY_MOVIE]: constant(0),
}, 0);

export const updateProgress = createAction(UPDATE_PROGRESS, identity);

export const currentPlayedMovieSelector = getOr(null, 'player.currentEpisode');
export const durationSelector = getOr(null, 'player.duration');
export const progressSelector = getOr(null, 'player.progress');

export default {
  player: combineReducers({
    currentEpisode: currentEpisodeReducer,
    duration,
    progress,
  }),
};
