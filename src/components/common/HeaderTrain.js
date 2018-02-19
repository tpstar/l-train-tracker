// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Make a component
const HeaderTrain = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <MaterialIcons
        style={{paddingTop: 4, color: props.trainColor}}
        name="train"
        size={26}
      />
      <Text style={{...textStyle, ...props.overwriteTextStyle}}>
        {props.headerText}
      </Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
  }
};

// Make the component available to other parts of the app
export { HeaderTrain };
