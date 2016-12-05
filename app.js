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
import Orientation from 'react-native-orientation';
import { compose, lifecycle, withState } from 'recompose';
import MoviesBlock from './src/components/MoviesBlock';
import Search from './src/components/SearchScreen';
import MoviesDetails from './src/components/DetailsScreen';
import store from './src/reducers/createStore';

const Router = createRouter(() => ({
  dashboard: () => Dashboard,
  search: () => Search,
}));

const ModalMovieDetails = ({ isVisible, setVisible }) => (
  <Modal
    animation="fade"
    visible={isVisible}
  >
    <EnhancedPlayer />
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
    supportedOrientations={["landscape"]}
  >
    <Video source={{uri: "https://r5---sn-8pxuuxa-nboek.googlevideo.com/videoplayback?requiressl=yes&id=df36087b6715b21b&itag=18&source=webdrive&ttl=transient&app=explorer&ip=116.102.230.186&ipbits=8&expire=1480858989&sparams=requiressl%2Cid%2Citag%2Csource%2Cttl%2Cip%2Cipbits%2Cexpire&signature=D2C1AD7E9B7CD79698D63BD5CA35088792FFFD0.2F0AFF9B04F9BE287CBE597D351EED247575044C&key=ck2&mm=31&mn=sn-8pxuuxa-nboek&ms=au&mt=1480844299&mv=m&pl=20?title=SD/360p"}}   // Can be a URL or a local file.
      rate={1.0}                     // 0 is paused, 1 is normal.
      volume={1.0}                   // 0 is muted, 1 is normal.
      muted={false}                  // Mutes the audio entirely.
      paused={false}                 // Pauses playback entirely.
      resizeMode="cover"             // Fill the whole screen at aspect ratio.
      repeat={true}                  // Repeat forever.
      playInBackground={false}       // Audio continues to play when app entering background.
      playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
      progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
      onEnd={() => { setVisible(false); }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    />
    <TouchableOpacity
      onPress={() => { setVisible(false); }}
      style={{
        height: 50,
        width: 50,
        position: 'absolute',
        backgroundColor: 'green',
        top: 0,
        left: 0,
      }}
    />
  </Modal>
);

const EnhancedPlayer = compose(
  withState('isVisible', 'setVisible', true),
  lifecycle({
    componentDidMount: () => {
      Orientation.lockToLandscape();
    },
    componentWillUnmount: () => {
      Orientation.lockToPortrait();
    },
  })
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
