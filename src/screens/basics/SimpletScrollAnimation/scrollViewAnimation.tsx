import React from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import Animated, {useAnimatedScrollHandler, useSharedValue, withSpring} from "react-native-reanimated";
import Page from "./page";
const WORDS = ["What's", "Up","Youtube","Dude"]
const ScrollViewAnimation: React.FC<{}> = () => {
    const translateX = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler((event)=>{

         translateX.value = withSpring(event.contentOffset.x)
    })


    return (
            <Animated.ScrollView
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                horizontal
                pagingEnabled={true}
                decelerationRate="fast"
                bounces={false}
            >
                {WORDS.map((word,index)=>{
                    return <Page translateX={translateX} key={index.toString()} title={word} index={index} />
                })}
            </Animated.ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default ScrollViewAnimation
