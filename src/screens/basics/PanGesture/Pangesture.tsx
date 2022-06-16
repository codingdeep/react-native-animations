import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import Page, {PAGE_WIDTH} from "./Page";
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import Animated, {
    cancelAnimation,
    useAnimatedGestureHandler,
    useDerivedValue,
    useSharedValue,
    withDecay
} from "react-native-reanimated";

const {width} = Dimensions.get('window')
const titles: string[] = ["What's", "Up", "YouTube", "Developer"]
type ContextType = {
    x:number
}
const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1)
const PanGesture: React.FC<{}> = () => {
    const translateX:Animated.SharedValue<number> = useSharedValue<number>(0)
    const clampedTranslateX = useDerivedValue(()=>{
        return Math.max(Math.min(translateX.value,0),MAX_TRANSLATE_X)
    })
    const gestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,ContextType>({
        onStart:(event, context)=>{
            context.x = clampedTranslateX.value;
            cancelAnimation(translateX)
        },
        onActive:(event, context)=>{
            translateX.value = event.translationX + context.x
        },
        onEnd:(event)=>{
            translateX.value = withDecay({
                velocity: event.velocityX
            })
        }
    })
    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={gestureEventHandler}>
                <Animated.View style={{flex: 1}}>
                    {titles.map((title, index) => (
                        <Page translateX={clampedTranslateX} title={title} index={(index).toString()}/>
                    ))}
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    }
})
export default PanGesture
