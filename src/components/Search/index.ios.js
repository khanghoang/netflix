import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const SearchBarSearchIcon = () =>
  <Icon
    name="magnifying-glass"
    style={{
      position: 'absolute',
      left: 18,
      top: 30,
      backgroundColor: 'transparent',
    }}
    size={18}
    color="#7E7F80"
  />;

const Search = () =>
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
          marginTop: 26,
          marginHorizontal: 10,
          height: 30,
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
      />
      <SearchBarSearchIcon />
    </View>
    <ListSuggestions />
  </View>;

const ListSuggestions = () => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });
  const data = ds.cloneWithRows([
    'Netflix originals',
    'TV Shows',
    'Action & Adventure',
    'Award-winning Movies',
    'Children & Family Movies',
    'Comedies',
    'Crime Movies',
    'Documentaries',
    'Dramas',
    'Horror Movies',
  ]);

  return (
    <ListView
      style={{
        flex: 1,
        backgroundColor: '#171819',
      }}
      dataSource={data}
      renderRow={rowData =>
        <TouchableOpacity>
          <Text
            style={{
              color: '#9A9B9C',
              textAlign: 'center',
              padding: 10,
              fontSize: 16,
            }}
          >
            {rowData}
          </Text>
        </TouchableOpacity>}
    />
  );
};

/* eslint-disable */
export default class SearchScreen extends Component {
  render() {
    return <Search />;
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
