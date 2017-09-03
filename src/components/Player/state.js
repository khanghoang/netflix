import { createAction, handleActions } from 'redux-actions';
import { identity, constant, noop } from 'lodash';
import { getOr } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';
import { combineReducers } from 'redux';

export const fetchEspisodeAction = espisodeID => {
  const {
    isFetchingSelector: isFetchingEspisode,
    dataSelector: espisodeSelector,
    actionCreator: fetchEspisode,
  } = makeFetchAction(`esposide_${espisodeID}`, () => ({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    endpoint: `http://hdvn.tv/ajax/loadep/${espisodeID}`,
    method: 'POST',
    body: `epid=${espisodeID}`,
  }));

  return {
    isFetchingEspisode,
    espisodeSelector,
    fetchEspisode,
  };
};

const PLAY_MOVIE = 'PLAY_MOVIE';
const CLOSE_PLAY_MOVIE = 'CLOSE_PLAY_MOVIE';
const UPDATE_SEEKER_PROGRESS = 'UPDATE_SEEKER_PROGRESS';

// export const playMovieWithID = createAction(PLAY_MOVIE, identity);
export const playMovieWithID = epid => ({
  type: PLAY_MOVIE,
  payload: epid,
});
export const closePlayer = createAction(CLOSE_PLAY_MOVIE, identity);

const currentEpisodeReducer = handleActions(
  {
    [PLAY_MOVIE]: (state, { payload }) => payload,
    [CLOSE_PLAY_MOVIE]: constant(null),
  },
  null
);

const UPDATE_DURATION = 'UPDATE_DURATION';

const duration = handleActions(
  {
    [UPDATE_DURATION]: (state, { payload }) => payload,
    [CLOSE_PLAY_MOVIE]: constant(0),
  },
  0
);

export const updateDuration = createAction(UPDATE_DURATION, identity);

const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

const progress = handleActions(
  {
    [UPDATE_PROGRESS]: (state, { payload }) => payload,
    [CLOSE_PLAY_MOVIE]: constant(0),
  },
  0
);

export const updateProgress = createAction(UPDATE_PROGRESS, identity);

export const PAUSE = 'PAUSE';
export const PLAY = 'PLAY';

const isPaused = handleActions(
  {
    [PAUSE]: constant(true),
    [PLAY]: constant(false),
    [CLOSE_PLAY_MOVIE]: constant(false),
  },
  false
);

export const playCurrentMovie = createAction(PLAY, identity);
export const pauseCurrentMovie = createAction(PAUSE, identity);

export const currentPlayedMovieSelector = getOr(0, 'player.currentEpisode');
export const durationSelector = getOr(0, 'player.duration');
export const progressSelector = getOr(0, 'player.progress');
export const isPausedSelector = getOr(null, 'player.isPaused');

const {
  isFetchingSelector: isFetchingDetailsEpisodes,
  dataSelector: detailsEpisodesSelector,
  actionCreator: fetchDetailsEspisodes,
} = makeFetchAction('movie_details_episodes', () => ({
  endpoint:
    'https://api.themoviedb.org/3/tv/60699/season/2?api_key=eb32a449fa8baebded9cd3b02bc0fef4',
}));

export {
  isFetchingDetailsEpisodes,
  detailsEpisodesSelector,
  fetchDetailsEspisodes,
};

const OPEN_EPISODES = 'OPEN_EPISODES';
const CLOSE_EPISODES = 'CLOSE_EPISODES';
const DRAGGING = 'DRAGGING';

const isOpenEpisodes = handleActions(
  {
    [OPEN_EPISODES]: constant(true),
    [CLOSE_EPISODES]: constant(false),
  },
  false
);

const seekerProgress = handleActions(
  {
    [UPDATE_SEEKER_PROGRESS]: (state, { payload }) => payload,
  },
  0
);

const isDragging = handleActions(
  {
    [DRAGGING]: (state, { payload }) => payload,
  },
  false
);

const TOGGLE_CONTROLLER = 'TOGGLE_CONTROLLER';

const isShowController = handleActions(
  {
    [TOGGLE_CONTROLLER]: state => !state,
  },
  true
);

export const openEpisode = createAction(OPEN_EPISODES, identity);
export const closeEpisode = createAction(CLOSE_EPISODES, identity);
export const updateSeekerProgress = createAction(
  UPDATE_SEEKER_PROGRESS,
  identity
);
export const toggleController = createAction(TOGGLE_CONTROLLER, noop);
export const setIsDragging = createAction(DRAGGING, constant(true));
export const setIsNotDragging = createAction(DRAGGING, constant(false));

export const seekerProgressSelector = getOr(0, 'player.seekerProgress');
export const isOpenEpisodesSelector = getOr(false, 'player.isOpenEpisodes');
export const isDraggingSelector = getOr(false, 'player.isDragging');
export const isShowControllerSelector = getOr(false, 'player.isShowController');

export default {
  player: combineReducers({
    currentEpisode: currentEpisodeReducer,
    duration,
    progress,
    isPaused,
    isOpenEpisodes,
    seekerProgress,
    isDragging,
    isShowController,
  }),
};
