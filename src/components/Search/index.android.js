import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native';
import { compose, withProps, withState } from 'recompose';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MoviesBlock } from '../Movie';

const SearchBarSearchIcon = ({ style = {} }) =>
  <Icon
    name="arrow-back"
    style={[
      {
        backgroundColor: 'transparent',
      },
      ...style,
    ]}
    size={25}
    color="#808080"
  />;

const Search = ({ isTypingSearch, onPress, onBlur, onChange, searchText }) =>
  <View style={{ flex: 1, backgroundColor: '#ddd' }}>
    <View
      style={{
        height: 44,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          height: 44,
          width: 55,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SearchBarSearchIcon />
      </View>
      <TextInput
        style={{
          flex: 1,
          height: 44,
          fontSize: 16,
          color: '#808081',
        }}
        onFocus={onPress}
        onBlur={onBlur}
        onChange={onChange}
        underlineColorAndroid="transparent"
        returnKeyType="search"
        value={searchText}
        placeholder="Search"
        placeholderTextColor="#808081"
      />
    </View>
    {isTypingSearch ? <ListSuggestions /> : <TopHitSections />}
  </View>;

const HighlightMovieBlock = compose(
  withProps(props => ({
    isFetching: false,
    headerText: 'Highlights',
    movies: [
      {
        movie_id: '1239',
        name: 'Luck-Key',
        name_vi: 'Xin Lỗi Anh Chỉ Là Sát Thủ',
        actor: 'Hae-jin Yoo, Joon Lee, Yun-hie Jo, Ji-Yeon Lim',
        year: '2016',
        country: 'Hàn Quốc',
        category: 'Hành Động, Hài Hước',
        status: '720p',
        length: '112 min',
        poster: 'uploads/poster/luck-key-1483765049.jpg',
      },
      {
        movie_id: '939',
        name: 'Jack Reacher: Never Go Back',
        name_vi: 'Jack Reacher: Không Quay Đầu',
        actor: 'Tom Cruise, Cobie Smulders, Robert Knepper, Aldis Hodge',
        year: '2016',
        country: 'Âu Mỹ',
        category: 'Hành Động, Phiêu Lưu, Tội Phạm',
        status: 'HDRip',
        length: '118 min',
        poster: 'uploads/poster/jack-reacher-never-go-back-1477807346.jpg',
      },
      {
        movie_id: '1224',
        name: 'Power Rangers',
        name_vi: '5 Anh Em Siêu Nhân',
        actor: 'Bryan Cranston, Elizabeth Banks, Bill Hader, Naomi Scott',
        year: '2017',
        country: 'Âu Mỹ',
        category: 'Hành Động, Phiêu Lưu, Viễn Tưởng',
        status: '1080p',
        length: 'N/A',
        poster: 'uploads/poster/power-rangers-1483377920.jpg',
      },
      {
        movie_id: '1221',
        name: 'Max Steel',
        name_vi: 'Chiến Binh Ngoài Hành Tinh',
        actor: 'Ben Winchell, Josh Brener, Maria Bello, Andy Garcia',
        year: '2016',
        country: 'Âu Mỹ',
        category: 'Hành Động, Phiêu Lưu, Viễn Tưởng',
        status: '1080p',
        length: '92 min',
        poster: 'uploads/poster/max-steel-1483376354.jpg',
      },
    ],
    ...props,
  }))
)(MoviesBlock);

const TopHitSections = () =>
  <View
    style={{
      paddingHorizontal: 20,
      height: 430,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingBottom: 30,
    }}
  >
    <HighlightMovieBlock titleStyle={{ color: '#808080' }} />
    <HighlightMovieBlock titleStyle={{ color: '#808080' }} />
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
        height: 100,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      }}
      dataSource={data}
      renderRow={rowData =>
        <TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}
          >
            <Icon
              name="history"
              size={20}
              style={{ paddingHorizontal: 15, paddingVertical: 10 }}
              color="#808080"
            />
            <Text
              style={{
                color: '#808080',
                textAlign: 'left',
                paddingHorizontal: 10,
                paddingVertical: 10,
                fontSize: 16,
              }}
            >
              {rowData}
            </Text>
          </View>
        </TouchableOpacity>}
    />
  );
};

const ConnectedSearchScreen = compose(
  withState('isTypingSearch', 'setIsTypingSearch', false),
  withState('searchText', 'setSearchText', ''),
  withProps(({ setIsTypingSearch, setSearchText, ...others }) => ({
    others,
    onPress: () => {
      setIsTypingSearch(true);
    },
    onBlur: () => {
      setIsTypingSearch(false);
    },
    onChange: e => {
      setSearchText(e.nativeEvent.text);
    },
  }))
)(Search);

/* eslint-disable */
export default class SearchScreen extends Component {
  render() {
    return <ConnectedSearchScreen />;
  }
}
/* eslint-enable */
