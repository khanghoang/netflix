import React from 'react';
import {
  TouchableOpacity,
  Image,
} from 'react-native';

export default ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <Image
      style={{
        width: 115,
        height: 165,
      }}
      source={{
        uri: 'https://image.tmdb.org/t/p/w500/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg',
      }}
    />
  </TouchableOpacity>
);
