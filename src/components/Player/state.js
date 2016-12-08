import { createAction, handleActions } from 'redux-actions';
import { identity, constant } from 'lodash';
import { getOr } from 'lodash/fp';

const PLAY_MOVIE = 'PLAY_MOVIE';
const CLOSE_PLAY_MOVIE = 'CLOSE_PLAY_MOVIE';

export const playMovieWithID = createAction(PLAY_MOVIE, identity);
export const closePlayer = createAction(CLOSE_PLAY_MOVIE, identity);

const reducer = handleActions({
  [PLAY_MOVIE]: constant(1),
  [CLOSE_PLAY_MOVIE]: constant(null),
}, null);

export const currentPlayedMovieSelector = getOr(null, 'player');

export default {
  player: reducer,
};
