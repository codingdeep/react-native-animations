import React, {useState} from "react";
import {Dimensions} from 'react-native'
import {PanGestureHandler, PanGestureHandlerGestureEvent,PanGestureHandlerProps} from "react-native-gesture-handler";
import {
    View,
    Text,
    Box
} from "native-base";
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS
} from 'react-native-reanimated'
import {makeStyledComponent} from "../../utils/styled";
const StyledView = makeStyledComponent(Animated.View);
interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    children: React.ReactNode,
    backView?: React.ReactNode,
    onSwipeLeft?:()=>void
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');


const SwipeAbleView:React.FC<{}> = () =>{
    return(
        <View>
            <Text>Hello</Text>
        </View>
    )
}
