import { createRouter } from '@exponent/ex-navigation';
import CategoryScreen from './category';
import Dashboard from './components/Home';
import Search from './components/Search';

Dashboard.route = {
  navigationBar: {
    title: 'Nextflix',
  },
};

export default createRouter(() => ({
  CategoryScreen: () => CategoryScreen,
  dashboard: () => Dashboard,
  search: () => Search,
}));

