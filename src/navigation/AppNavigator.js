import { StackNavigator } from "react-navigation";
import FavoriteStops from '../components/FavoriteStops';
import FavStopCreate from '../components/FavStopCreate';

const AppNavigator = StackNavigator({
  FavoriteStops: { screen: FavoriteStops },
  FavStopCreate: { screen: FavStopCreate }
});

export default AppNavigator;
