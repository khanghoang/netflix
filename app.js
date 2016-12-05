/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
  NavigationContext,
} from '@exponent/ex-navigation';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import { compose, withState } from 'recompose';
import MoviesBlock from './src/components/MoviesBlock';
import Search from './src/components/SearchScreen';
import MoviesDetails from './src/components/DetailsScreen';
import store from './src/reducers/createStore';

const { width, height } = Dimensions.get('window');

const Router = createRouter(() => ({
  dashboard: () => Dashboard,
  search: () => Search,
}));

const ModalMovieDetails = ({ isVisible }) => (
  <Modal
    animation="fade"
    visible={isVisible}
  >
    <MoviesDetails />
  </Modal>
);

const EnhancedMovieDetails = compose(
  withState('isVisible', 'setVisible', true),
)(ModalMovieDetails);

const Dashboard = () => (
  <View style={{ flex: 1 }}>
    <EnhancedMovieDetails />
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


const Player = ({ isVisible, setVisible }) => (
  <Modal
    animation="fade"
    visible={isVisible}
  >
    <View
      style={{
        left: -(height - width) / 2,
        top: (height - width) / 2,
        height: width,
        width: height,
        transform: [{
          rotate: '90deg',
        }],
      }}
    >
      <StatusBar
        barStyle="light-content"
        hidden
      />
      <Video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        source={{
          uri: "https://redirector.googlevideo.com/videoplayback?requiressl=yes&id=df36087b6715b21b&itag=22&source=webdrive&ttl=transient&app=explorer&ip=113.161.94.162&ipbits=8&expire=1480924474&sparams=requiressl%2Cid%2Citag%2Csource%2Cttl%2Cip%2Cipbits%2Cexpire&signature=8670613E3F9B54D339AC15ECB31912CBACB3DCBC.303FFB67F9B46DA284CE6AF4FB727B192453A328&key=ck2&mm=31&mn=sn-8qj-nboez&ms=au&mt=1480909902&mv=m&pl=26?title=HD/720p"
        }}
        rate={1.0}
        volume={1.0}
        muted={false}
        paused={false}
        resizeMode="cover"
        repeat={false}
        playInBackground={false}
        playWhenInactive={false}
        progressUpdateInterval={250.0}
        onEnd={() => { setVisible(false); }}
      />
      <TouchableOpacity
        onPress={() => { setVisible(false); }}
        style={{
          height: 50,
          width: 50,
          position: 'absolute',
          backgroundColor: 'green',
          top: 0,
          right: 0,
        }}
      />
    </View>
  </Modal>
);

const EnhancedPlayer = compose(
  withState('isVisible', 'setVisible', true),
)(Player);

// eslint-disable-next-line immutable/no-mutation
Dashboard.route = {
  navigationBar: {
    title: 'Nextflix',
    backgroundColor: '#28292A',
    borderBottomWidth: 1,
    borderBottomColor: '#2B2C2D',
    titleStyle: {
      color: '#E7E8E9',
    },
  },
};

const DashboardIcon = ({ color }) => (<Icon name="home" size={20} color={color} />);
const SearchIcon = ({ color }) => (<Icon name="magnifying-glass" size={20} color={color} />);
const UserIcon = ({ color }) => (<Icon name="user" size={20} color={color} />);
const renderTitle = (selected, title) => (
  <Text style={{ color: selected ? '#CD1729' : '#919293' }}>{title}</Text>
);

const navigationContext = new NavigationContext({
  router: Router,
  store,
});

export default () => (
  <Provider store={store}>
    <NavigationProvider context={navigationContext}>
      <StatusBar
        barStyle="light-content"
      />
      <TabNavigation
        tabBarColor="#2B2C2D"
        tabBarHeight={50}
        translucent
        tabBarStyle={{
          borderTopWidth: 1,
          borderTopColor: '#2B2C2D',
        }}
        id="main"
        navigatorUID="main"
        initialTab="dashboard"
      >
        <TabItem
          id="dashboard"
          title="Home"
          renderTitle={renderTitle}
          renderIcon={(selected) => <DashboardIcon color={selected ? '#CD1729' : '#919293'} />}
        >
          <StackNavigation
            id="dashboard"
            initialRoute={Router.getRoute('dashboard')}
          />
        </TabItem>
        <TabItem
          id="search"
          title="Search"
          renderTitle={renderTitle}
          renderIcon={(selected) => <SearchIcon color={selected ? '#CD1729' : '#919293'} />}
        >
          <StackNavigation
            id="search"
            initialRoute={Router.getRoute('search')}
          />
        </TabItem>
        <TabItem
          id="settings"
          title="User"
          renderTitle={renderTitle}
          renderIcon={(selected) => <UserIcon color={selected ? '#CD1729' : '#919293'} />}
        >
          <StackNavigation
            id="search"
            initialRoute={Router.getRoute('dashboard')}
          />
        </TabItem>
      </TabNavigation>
    </NavigationProvider>
  </Provider>
);

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
