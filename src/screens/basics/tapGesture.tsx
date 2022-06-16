import React, {useCallback, useEffect} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {TapGestureHandler} from "react-native-gesture-handler";
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import {transform} from "@babel/core";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const TapGesture: React.FC<{}> = () => {
    const scale = useSharedValue(0)
    const style = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: scale.value}
            ]
        }
    })
    const style1 = useAnimatedStyle(() => {
        return {
            transform: [
                {translateY: scale.value * 200}
            ]
        }
    })


    const onActivated = useCallback(() => {
        scale.value = withTiming(1, {duration: 2000}, (isFinished) => {
            if (isFinished) {
                scale.value = withTiming(0, {duration: 500})
            }
        })
    }, [])



    return (
        <Animated.View style={styles.container}>
            <TapGestureHandler
                maxDelayMs={200}
                numberOfTaps={2}
                onActivated={onActivated}
            >
                <AnimatedImage source={require('../../assets/avatars/jmitch.png')}/>
            </TapGestureHandler>
            <Animated.View style={[style, style1]}>
                <Text>{scale.value}</Text>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default TapGesture
