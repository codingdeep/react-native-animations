import React from 'react';
import 'react-native-reanimated'
import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Phizcoffee from './src/screens/phizcoffee';
import Parallax from "./src/screens/parallax";
import FlingGesture from "./src/screens/FlingGesture";
import Details from "./src/screens/details";
import {BottomTabNavigationOptions, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BasicAnimation from "./src/screens/basicAnimation";
import {MenuItems} from "./src/components/Menus/menuItems";
import Animation1 from "./src/screens/basics/animation1";
import Animation2 from "./src/screens/basics/animation2";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Snapchat, {stories} from "./src/screens/basics/snapchat/snapchat";
import Story from "./src/screens/basics/snapchat/story";
import {createSharedElementStackNavigator, SharedElementCompatRoute} from "react-navigation-shared-element";
import {SnapchatRoutes} from "./src/screens/basics/snapchat/Models";
import Chat from "./src/screens/basics/animation4/Chat";
import {ChatRoutes} from "./src/screens/basics/animation4/Models";
import ChatStory from "./src/screens/basics/animation4/ChatStory";
import ScrollViewAnimation from "./src/screens/basics/SimpletScrollAnimation/scrollViewAnimation";
import PinchGesture from "./src/screens/basics/PinchGesture";
import TapGesture from "./src/screens/basics/tapGesture"
import CardsAnimation from "./src/screens/FlatListAnimation/cardsAnimation";
import PanGesture from "./src/screens/basics/PanGesture/Pangesture";
import Accordions from "./src/screens/basics/Accordion";
import {NativeBaseProvider} from "native-base";
import CarAnimation from "./src/screens/basics/CarAnimation";
import CircularProgressBar from "./src/screens/basics/circularProgress";
import ProgressBar from "./src/screens/ProgressBar";
import Todo from "./src/screens/todo/toDo";
import theme from './src/theme'
import {createDrawerNavigator} from "@react-navigation/drawer";
import MainScreen from "./src/screens/todo/main";
import About from "./src/screens/todo/about";
import ScrollAnimation from "./src/screens/basics/ScrollAnimation";
import Channel from "./src/screens/basics/ChannelAnimation/channel";
import ColorPicker from './src/screens/basics/ColorPicker'
import Wave from "./src/screens/Svg/wave";
import Promo from "./src/screens/basics/CardAnimation";
export const assets = stories
    .map((story) => [story.avatar, story.source])
    .flat();


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
    Basic,
    SnapScreen,
    AnimScreens,
    scrollViewAnimation,
    pinGesture,
    tapGesture,
    FlatList,
    pangesture,
    accordion,
    progress,
    Todo,
    progress,
    scrollAnimation,
    monzo
}

const Stack = createBottomTabNavigator<StackParams>();

const BasicStack = createNativeStackNavigator();
const BasicAnimatedScreen = () => (
    <BasicStack.Navigator>
        <BasicStack.Screen name="Basic" component={BasicAnimation}/>
        <BasicStack.Screen name="animation1" component={Animation1}/>
        <BasicStack.Screen options={options} name="animation2" component={Animation2}/>
        <BasicStack.Screen name="animation3" component={Phizcoffee}/>
        <BasicStack.Screen options={stackScreenOptions} name="animation4" component={AnimScreens}/>
        <BasicStack.Screen options={stackScreenOptions} name="animation5" component={SnapScreen}/>
        <BasicStack.Screen options={stackScreenOptions} name="scrollViewAnimation" component={ScrollViewAnimation}/>
        <BasicStack.Screen options={stackScreenOptions} name="pinGesture" component={PinchGesture}/>
        <BasicStack.Screen options={stackScreenOptions} name="tapGesture" component={TapGesture}/>
        <BasicStack.Screen options={stackScreenOptions} name="pangesture" component={PanGesture}/>
        <BasicStack.Screen options={stackScreenOptions} name="accordion" component={Accordions}/>
        <BasicStack.Screen options={stackScreenOptions} name="car" component={CarAnimation}/>
        <BasicStack.Screen options={stackScreenOptions} name="progress" component={CircularProgressBar}/>
        <BasicStack.Screen options={stackScreenOptions} name="scrollAnimation" component={ScrollAnimation}/>
        <BasicStack.Screen options={stackScreenOptions} name="channel" component={Channel}/>
        <BasicStack.Screen options={stackScreenOptions} name="colorPicker" component={ColorPicker}/>
        <BasicStack.Screen options={stackScreenOptions} name="monzo" component={Promo}/>
    </BasicStack.Navigator>
)


const AnimStack = createSharedElementStackNavigator<ChatRoutes>();
const sharedScreenOptions = {
    headerShown: false,
    cardOverlayEnabled: false,
    presentation: 'modal',
    gestureEnabled: false,
    cardStyle: {backgroundColor: 'transparent'}
}
const AnimScreens = () => (
    <AnimStack.Navigator screenOptions={sharedScreenOptions}>
        <AnimStack.Screen name="chat" component={Chat}/>
        <AnimStack.Screen
            sharedElements={(route) => {
                return [route.params.story.id]
            }}
            name="chatStory" component={ChatStory}/>
    </AnimStack.Navigator>
)

const SnapStack = createSharedElementStackNavigator<SnapchatRoutes>()

const SnapScreen = () => (
    <SnapStack.Navigator
        screenOptions={{
            gestureEnabled: false,
            headerShown: false,
            cardOverlayEnabled: true,
            presentation: 'modal',
            cardStyle: {backgroundColor: "transparent"}
        }}>
        <SnapStack.Screen name="snapchat" component={Snapchat}/>
        <SnapStack.Screen
            name="story"
            component={Story}
            sharedElements={(route: SharedElementCompatRoute) => {
                // console.log(route)
                return [route.params.story.id]
            }}
        />
    </SnapStack.Navigator>
)


type FlatListRoutes = {
    cardsAnimation
}

const FlatListAnimationStack = createNativeStackNavigator<FlatListRoutes>();
const FlatListAnimationScreens = () => {
    return (
        <FlatListAnimationStack.Navigator>
            <FlatListAnimationStack.Screen options={{headerShown: false}} name="cardsAnimation"
                                           component={CardsAnimation}/>
        </FlatListAnimationStack.Navigator>
    )
}
const Drawer = createDrawerNavigator();
const TodoScreens = ()=>{
    return(
        <Drawer.Navigator initialRoutename="Main">
            <Drawer.Screen name="Main" component={MainScreen}/>
            <Drawer.Screen name="About" component={About}/>
        </Drawer.Navigator>
    )
}

const SvgStack = createNativeStackNavigator();
const SvgStackScreen = () => {
    return (
        <SvgStack.Navigator>
            <SvgStack.Screen options={{headerShown: false}} name="wave"
                                           component={Wave}/>
        </SvgStack.Navigator>
    )
}


const App: React.FC<{}> = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NativeBaseProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={({route}) => ({
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName;

                                if (route.name === 'Parallax') {
                                    iconName = focused
                                        ? 'ios-information-circle'
                                        : 'ios-information-circle-outline';
                                } else if (route.name === 'FlingGesture') {
                                    iconName = focused ? 'ios-list-box' : 'ios-list';
                                } else if (route.name === 'Basic') {
                                    iconName = focused ? 'ios-list-box' : 'ios-list';
                                } else if (route.name === 'FlatList') {
                                    iconName = focused ? 'ios-list-box' : 'ios-list';
                                } else {
                                    iconName = focused ? 'ios-list-box' : 'ios-list';
                                }

                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color}/>;
                            },
                            tabBarActiveTintColor: 'tomato',
                            tabBarInactiveTintColor: 'gray',
                        })}
                        initialRouteName="Phizcoffee">
                        <Stack.Screen name="Parallax" component={Parallax}/>
                        <Stack.Screen options={{...options}} name="FlingGesture" component={FlingGesture}/>
                        <Stack.Screen options={{...options, tabBarBadge: 9}} name="Basic"
                                      component={BasicAnimatedScreen}/>
                        <Stack.Screen name="progress" component={ProgressBar}/>
                        <Stack.Screen options={{...options}} name="Todo" component={TodoScreens}/>
                        <Stack.Screen options={{...options}} name="SVG" component={SvgStackScreen}/>

                    </Stack.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </GestureHandlerRootView>
    );
};
export default App;
