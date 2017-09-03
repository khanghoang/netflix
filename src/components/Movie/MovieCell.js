import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

export default ({
  onPress: openDetails,
  movie: { poster_path: poster, id: movieID },
}) =>
  <TouchableOpacity
    onPress={() => {
      openDetails(movieID);
    }}
  >
    <Image
      style={{
        backgroundColor: 'black',
        width: 115,
        height: 165,
      }}
      source={{
        uri: `https://image.tmdb.org/t/p/w300${poster}`,
      }}
    />
  </TouchableOpacity>;
