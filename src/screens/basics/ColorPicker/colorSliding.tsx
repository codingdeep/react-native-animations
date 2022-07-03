import React from 'react';
import LinearGradient, {LinearGradientProps} from 'react-native-linear-gradient';
import {Box, View} from 'native-base'
import {StyleSheet} from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    useDerivedValue,
    interpolateColor, runOnJS
} from 'react-native-reanimated'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";

const CIRCLE_PICKER_SIZE = 20;


interface Props extends LinearGradientProps {
    max_picker_width: number,
    changeColor?:(color:any) => void
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
type ContextType = {
    x: number
}
const ColorSliding: React.FC<Props> = ({colors,changeColor,max_picker_width, start, end, style}) => {

    const translateX = useSharedValue(0)

    const adjustment = useDerivedValue(()=>{
        return Math.min(Math.max(translateX.value,0), max_picker_width - CIRCLE_PICKER_SIZE)
    })


    const gestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,ContextType>({
        onStart:(event, context)=>{
            context.x = adjustment.value
        },
        onActive:(event,context)=>{
            translateX.value = event.translationX + context.x
        },
        onEnd:()=>{}
    })

    const translateStyle = useAnimatedStyle(()=>{
        return{
            transform:[{
                translateX: adjustment.value
            }]
        }
    })

    const backgroundStyle = useAnimatedStyle(()=>{
        const input = colors.map((_,index)=>max_picker_width/colors.length * index+1)
        const backgroundColor= interpolateColor(
            translateX.value,
            input,
            colors
        )
        changeColor?.(backgroundColor)
        return {backgroundColor}
    })

    return (
        <PanGestureHandler onGestureEvent={gestureEventHandler}>
            <AnimatedBox>
                <LinearGradient
                    colors={colors}
                    start={start}
                    end={end}
                    style={style}
                />
                <Animated.View style={[styles.circle,translateStyle]}>
                    <Animated.View style={[styles.miniCircle,backgroundStyle]} />
                </Animated.View>

            </AnimatedBox>
        </PanGestureHandler>
    )
}
const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_PICKER_SIZE,
        height: CIRCLE_PICKER_SIZE,
        borderRadius: CIRCLE_PICKER_SIZE / 2,
        position: 'absolute',
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center'
    },
    miniCircle:{
        width: CIRCLE_PICKER_SIZE / 2,
        height: CIRCLE_PICKER_SIZE / 2,
        borderRadius: CIRCLE_PICKER_SIZE / 2
    }
})
export default ColorSliding;
