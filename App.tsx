import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Phizcoffee from './src/screens/phizcoffee';
import Parallax from "./src/screens/parallax";
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PhijCoffee" component={Phizcoffee} />
        <Stack.Screen name="Parallax" component={Parallax} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
