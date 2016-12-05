import React from 'react';
import {
  Modal,
} from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import MoviesDetails from '../../components/Details';
import {
  isShowPopupDetail,
} from './state';

const ModalMovieDetails = ({ isVisible }) => (
  <Modal
    onRequestClose={() => {}}
    animation="slide"
    visible={isVisible}
  >
    <MoviesDetails />
  </Modal>
);

export default compose(
  connect(
    (state) => ({
      isVisible: isShowPopupDetail(state),
    })
  )
)(ModalMovieDetails);
