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
        onRemove,
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
                translateX.value = withSpring(0)
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
        <StyledView>
            <PanGestureHandler onGestureEvent={gestureEventHandler}>
                <StyledView style={sStyle}>
                    {children}
                </StyledView>
            </PanGestureHandler>
        </StyledView>
    )
}

export default CustomSwipeAble
