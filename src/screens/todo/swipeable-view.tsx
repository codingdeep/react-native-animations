import React,{useState} from 'react'
import {Dimensions} from 'react-native'
import {PanGestureHandler, PanGestureHandlerGestureEvent,PanGestureHandlerProps} from "react-native-gesture-handler";
import Animated, {useSharedValue,withSpring, withTiming,useAnimatedGestureHandler,useAnimatedStyle,runOnJS} from 'react-native-reanimated'
import {View, Text,Box} from 'native-base'
import {makeStyledComponent} from '../../utils/styled'

const StyledView   = makeStyledComponent(Animated.View)
interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    children: React.ReactNode,
    backView?: React.ReactNode,
    onSwipeLeft?: ()=> void
}
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2;
const SwipeAbleView:React.FC<Props>=(props)=>{
    const {children, backView, onSwipeLeft,simultaneousHandlers} = props
    const translateX:Animated.SharedValue<number> = useSharedValue<number>(0)
    const panGesture = useAnimatedGestureHandler({
        onActive:({translationX})=>{
            translateX.value =  Math.max(-128, Math.min(0, translationX))
        },
        onEnd: ()=>{
            const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD
            if(shouldBeDismissed){
                translateX.value = withTiming(-SCREEN_WIDTH)
                onSwipeLeft && runOnJS(onSwipeLeft)()
            }else{
                translateX.value = withTiming(0)
            }
        }
    })

    const facadeStyle = useAnimatedStyle(()=>({
        transform:[
            {translateX: translateX.value}
        ]
    }))

    return(
        <StyledView>
            {backView && (
                <Box position="absolute" left={0} right={0} bottom={0} top={0}>{backView}</Box>
            )}
            <PanGestureHandler
                onGestureEvent={panGesture}
                simultaneousHandlers={simultaneousHandlers}>
                <StyledView style={facadeStyle}>
                    {children}
                </StyledView>
            </PanGestureHandler>
        </StyledView>
    )
}
export default SwipeAbleView;


// const SwipeAbleView:React.FC<{}> = () =>{
//     return(
//         <View>
//             <Text>Hello</Text>
//         </View>
//     )
// }
