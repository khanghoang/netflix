import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MoviesBlock from '../MoviesBlock';

const SearchBarSearchIcon = () => (
  <Icon
    name="magnifying-glass"
    style={{
      position: 'absolute',
      left: 6,
      top: 2,
      backgroundColor: 'transparent',
    }}
    size={18}
    color="#6A6B6C"
  />
);

const Search = () => (
  <View style={{ flex: 1 }}>
    <View
      style={{
        height: 64,
        borderBottomWidth: 1,
        borderBottomColor: '#292A2B',
        backgroundColor: '#252627',
      }}
    >
      <TextInput
        style={{
          marginTop: 30,
          marginHorizontal: 10,
          height: 25,
          backgroundColor: '#313233',
          borderRadius: 2,
          paddingLeft: 30,
          paddingRight: 10,
          fontSize: 14,
          color: '#808081',
        }}
        returnKeyType="search"
        value=""
        placeholder="Search"
        placeholderTextColor="#808081"
      >
        <SearchBarSearchIcon />
      </TextInput>
    </View>
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <MoviesBlock />
      <MoviesBlock />
      <MoviesBlock />
      <MoviesBlock />
      <MoviesBlock />
    </ScrollView>
  </View>
);

/* eslint-disable */
export default class SearchScreen extends Component {
  render() {
    return <Search />
  }
}
/* eslint-enable */

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 70,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 7,
    backgroundColor: '#171819',
  },
});
