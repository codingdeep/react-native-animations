import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';

import Phizcoffee from './src/screens/phizcoffee';
import Parallax from "./src/screens/parallax";
import FlingGesture from "./src/screens/FlingGesture";
import Details from "./src/screens/details";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

//const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
    headerShown: false
};
export type StackParams = {
    Phizcoffee,
    Details:{
        name:string
    },
    Parallax,
    FlingGesture
}
const Stack = createBottomTabNavigator<StackParams>();


const App:React.FC<{}>=() => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Phijcoffee">
        <Stack.Screen name="PhijCoffee" component={Phizcoffee} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Parallax" component={Parallax} />
        <Stack.Screen  name="FlingGesture" component={FlingGesture} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
