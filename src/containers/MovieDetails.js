import React from 'react';
import {
  Modal,
} from 'react-native';
import { compose, withState } from 'recompose';
import MoviesDetails from '../components/Details';

const ModalMovieDetails = ({ isVisible }) => (
  <Modal
    onRequestClose={() => {}}
    animation="fade"
    visible={isVisible}
  >
    <MoviesDetails />
  </Modal>
);

export default compose(
  withState('isVisible', 'setVisible', true),
)(ModalMovieDetails);
