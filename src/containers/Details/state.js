import { createAction, handleActions } from 'redux-actions';
import { identity, constant } from 'lodash';
import { getOr } from 'lodash/fp';

const SHOW_DETAILS = 'SHOW_DETAILS';
const HIDE_DETAILS = 'HIDE_DETAILS';

export const showDetails = createAction(SHOW_DETAILS, identity);
export const hideDetails = createAction(HIDE_DETAILS, identity);
const reducer = handleActions({
  [SHOW_DETAILS]: constant(true),
  [HIDE_DETAILS]: constant(false),
}, false);

export const isShowPopupDetail = getOr(false, 'isShowPopupDetail');

export default {
  isShowPopupDetail: reducer,
};