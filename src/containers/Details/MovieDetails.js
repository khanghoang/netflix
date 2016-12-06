import React from 'react';
import Modal from 'react-native-modalbox';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import MoviesDetails from '../../components/Details';
import {
  isShowPopupDetail,
  hideDetails,
} from './state';

const ModalMovieDetails = ({
  isVisible,
  hideDetails,
}) => (
  <Modal
    isOpen={isVisible}
    onClosed={hideDetails}
    swipeToClose={false}
  >
    <MoviesDetails />
  </Modal>
);

export default compose(
  connect(
    (state) => ({
      isVisible: isShowPopupDetail(state),
    }),
    ({
      hideDetails,
    })
  )
)(ModalMovieDetails);
