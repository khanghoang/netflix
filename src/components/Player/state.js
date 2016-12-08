import { createAction, handleActions } from 'redux-actions';
import { identity, constant } from 'lodash';
import { get } from 'lodash/fp';

const PLAY_MOVIE = 'PLAY_MOVIE';
const CLOSE_PLAY_MOVIE = 'CLOSE_PLAY_MOVIE';

export const playMovieWithID = createAction(PLAY_MOVIE, identity);
export const closePlayer = createAction(CLOSE_PLAY_MOVIE, identity);

const reducer = handleActions({
  [PLAY_MOVIE]: ({ payload }) => payload,
  [CLOSE_PLAY_MOVIE]: constant(null),
}, null);

export const currentPlayedMovieSelector = get(null, 'player');

export default {
  player: reducer,
};
