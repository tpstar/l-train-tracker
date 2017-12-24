import { StackNavigator } from "react-navigation";
import FavoriteStops from '../components/FavoriteStops';
import FavStopCreate from '../components/FavStopCreate';
import StopList from '../components/StopList';

const AppNavigator = StackNavigator({
  FavoriteStops: { screen: FavoriteStops },
  FavStopCreate: { screen: FavStopCreate },
  StopList: { screen: StopList }
});

export default AppNavigator;
