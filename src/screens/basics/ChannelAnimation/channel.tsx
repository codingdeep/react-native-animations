import React from "react";
import {View, StatusBar, StyleSheet, ScrollView} from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedScrollHandler,
    useSharedValue,
    withSpring, withTiming
} from "react-native-reanimated";
import {ItemProps, items} from "./Model";
import Item from "./item";
import {MAX_HEIGHT} from "./item";
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import {snapPoint} from "react-native-redash";
type ContextType={
    y: number
}
const Channel: React.FC<{}> = () => {
    const y:Animated.SharedValue<number> = useSharedValue<number>(0);
    const snapPoints = items.map((_,index)=>index * -MAX_HEIGHT)
    const gestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{y:number}>({
        onStart:(_,ctx)=>{
            ctx.y = y.value
        },
        onActive:({translationY},ctx)=>{
            y.value = ctx.y + translationY
        },
        onEnd:({velocityY:velocity})=>{
            const dest = snapPoint(y.value,velocity,snapPoints);
            y.value = withSpring(dest,{velocity,overshootClamping: true})
        }
    })


    return (
        <>
           <StatusBar hidden />
            <PanGestureHandler onGestureEvent={gestureEventHandler}>
                <Animated.View style={styles.container}>
                    {items.map((item:ItemProps, index:number)=>{
                        return <Item y={y} index={index} item={item} key={index} />
                    })}
                </Animated.View>
            </PanGestureHandler>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        height: MAX_HEIGHT * items.length
    },
    scrollView:{
        backgroundColor: 'black'
    }
})
export default Channel
