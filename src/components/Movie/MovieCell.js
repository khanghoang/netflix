import React from 'react';
import {
  TouchableOpacity,
  Image,
} from 'react-native';

export default ({
  onPress: openDetails,
  movie: { poster: imageURI, movie_id: movieID },
}) => (
  <TouchableOpacity
    onPress={() => { openDetails(movieID); }}
  >
    <Image
      style={{
        backgroundColor: 'black',
        width: 115,
        height: 165,
      }}
      source={{
        uri: `http://hdvn.tv/${imageURI}`,
      }}
    />
  </TouchableOpacity>
);
