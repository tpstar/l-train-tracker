import { StackNavigator } from "react-navigation";
import FavoriteStops from '../components/FavoriteStops';

const AppNavigator = StackNavigator({
  FavoriteStops: { screen: FavoriteStops },
});

export default AppNavigator;
