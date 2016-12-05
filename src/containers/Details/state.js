import { createAction, handleActions } from 'redux-actions';
import { identity } from 'lodash';
import { getOr } from 'lodash/fp';

const SHOW_DETAILS = 'SHOW_DETAILS';
const HIDE_DETAILS = 'HIDE_DETAILS';

export const showDetails = createAction(SHOW_DETAILS, identity);
export const hideDetails = createAction(HIDE_DETAILS, identity);
const reducer = handleActions({
  [SHOW_DETAILS]: () => true,
  [HIDE_DETAILS]: () => false,
}, false);

export const isShowPopupDetail = getOr(false, 'isShowPopupDetail');

export default {
  isShowPopupDetail: reducer,
};
