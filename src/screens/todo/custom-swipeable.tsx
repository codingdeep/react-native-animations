import React from "react";
import Styledhock from "../../utils/styledhoc";
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS, withSpring
} from 'react-native-reanimated'
import { Dimensions } from "react-native";
import {PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps} from "react-native-gesture-handler";
import {makeStyledComponent} from "../../utils/styled";
import {translate} from "react-native-redash/lib/typescript/v1";
import {Box} from "native-base";

interface CustomSwipeAbleProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    children: React.ReactNode,
    onSwipeLeft?: () => void,
    onRemove?: () => void,
    backView?: React.ReactNode
}
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * .3

const StyledView = makeStyledComponent(Animated.View)
const CustomSwipeAble: React.FC<CustomSwipeAbleProps> = (props) => {
    const {
        children,
        onSwipeLeft,
        backView,
        simultaneousHandlers
    } = props
    const translateX = useSharedValue(0)
    const gestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive:(event)=>{
            translateX.value = Math.max(-128,Math.min(0,event.translationX))

        },
        onEnd:(event)=>{
            const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD;
            if(shouldBeDismissed){
                console.log('reached to threshold')
                translateX.value = withSpring(-SCREEN_WIDTH)
                onSwipeLeft && runOnJS(onSwipeLeft)()
            }else{
                translateX.value = withTiming(0)
            }
        }
    });

    const sStyle = useAnimatedStyle(()=>{
        return{
            transform:[{
                translateX: translateX.value
            }]
        }
    })



    return (
        <StyledView w="full">
            {backView &&
                <Box position="absolute" left={0} right={0} top={0} bottom={0}>
                    {backView}
                </Box>
            }
            <PanGestureHandler onGestureEvent={gestureEventHandler}>
                <StyledView style={sStyle}>
                    {children}
                </StyledView>
            </PanGestureHandler>
        </StyledView>
    )
}

export default CustomSwipeAble
