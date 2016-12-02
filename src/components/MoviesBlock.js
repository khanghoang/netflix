import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import MovieCell from './MovieCell';

export default () => (
  <View
    style={{
      flex: 1,
    }}
  >
    <View
      style={{
        marginTop: 23,
        marginBottom: 5,
        height: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 16,
            flex: 1,
          }}
        >
          Popuplar on Netflix
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              width: 100,
              color: 'white',
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            See more >
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <MovieCell />
      <MovieCell />
      <MovieCell />
    </View>
  </View>
);
