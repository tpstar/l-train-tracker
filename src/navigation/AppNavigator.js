import { StackNavigator } from "react-navigation";
import FavStopList from '../components/FavStopList';
import LineList from '../components/LineList';
import StopList from '../components/StopList';
import DirList from '../components/DirList';
import ArrivalTimes from '../components/ArrivalTimes'

const AppNavigator = StackNavigator({
  FavStopList: { screen: FavStopList },
  LineList: { screen: LineList },
  StopList: { screen: StopList },
  DirList: { screen: DirList },
  ArrivalTimes: { screen: ArrivalTimes }
});

export default AppNavigator;
