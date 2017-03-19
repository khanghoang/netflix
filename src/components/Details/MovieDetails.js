import React from 'react';
import { StatusBar, Platform } from 'react-native';
import Modal from 'react-native-modalbox';
import { isEmpty } from 'lodash';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import MoviesDetails from '../../components/Details';
import {
  isShowPopupDetail,
  hideDetails,
  HOCMakeFetchAction,
} from './state';

const ModalMovieDetails = ({
  isVisible,
  hideDetails,
  movie,
  isFetching,
}) => (
  <Modal
    isOpen={isVisible}
    onClosed={hideDetails}
    swipeToClose={false}
  >
    {
      Platform.OS === 'ios'
      && <StatusBar
        barStyle="light-content"
        hidden={isVisible}
      />
    }
    <MoviesDetails
      isFetching={isFetching}
      movie={movie}
    />
  </Modal>
);

export default compose(
  connect(
    (state) => {
      const movieID = isShowPopupDetail(state);
      const { dataSelector, isFetching } = HOCMakeFetchAction(movieID);
      return {
        isVisible: Boolean(isShowPopupDetail(state)),
        movieID,
        movie: dataSelector(state),
        // use cache data
        isFetching: !isEmpty(dataSelector(state)) ? false : isFetching(state),
      };
    },
    ({
      hideDetails,
    })
  )
)(ModalMovieDetails);
