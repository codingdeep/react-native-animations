import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';

import Phizcoffee from './src/screens/phizcoffee';
import Parallax from "./src/screens/parallax";
import FlingGesture from "./src/screens/FlingGesture";
import Details from "./src/screens/details";
import {BottomTabNavigationOptions, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BasicAnimation from "./src/screens/basicAnimation";
import {MenuItems} from "./src/components/Menus/menuItems";
import Animation1 from "./src/screens/basics/animation1";

//const Stack = createNativeStackNavigator();

const options: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {display: "none"}
};
const stackScreenOptions: NativeStackNavigationOptions = {
    headerShown: false
};
export type StackParams = {
    Phizcoffee,
    Details: {
        name: string
    },
    Parallax,
    FlingGesture,
    BasicAnimatedScreen
}
const Stack = createBottomTabNavigator<StackParams>();

const BasicStack = createNativeStackNavigator();
const BasicAnimatedScreen = () => (
    <BasicStack.Navigator>
        <BasicStack.Screen name="BasicAnimation" component={BasicAnimation}/>
        <BasicStack.Screen name="animation1" component={Animation1}/>
    </BasicStack.Navigator>
)


const App: React.FC<{}> = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Phizcoffee">
                <Stack.Screen name="Phizcoffee" component={Phizcoffee}/>
                <Stack.Screen name="Details" component={Details}/>
                <Stack.Screen name="Parallax" component={Parallax}/>
                <Stack.Screen options={options} name="FlingGesture" component={FlingGesture}/>
                <Stack.Screen options={options} name="BasicAnimatedScreen" component={BasicAnimatedScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
