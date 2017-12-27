import { StackNavigator } from "react-navigation";
import FavoriteStops from '../components/FavoriteStops';
import FavStopCreate from '../components/FavStopCreate';
import StopList from '../components/StopList';
import DirList from '../components/DirList';
import FavStop from '../components/FavStop'

const AppNavigator = StackNavigator({
  FavoriteStops: { screen: FavoriteStops },
  FavStopCreate: { screen: FavStopCreate },
  StopList: { screen: StopList },
  DirList: { screen: DirList },
  FavStop: { screen: FavStop }
});

export default AppNavigator;
