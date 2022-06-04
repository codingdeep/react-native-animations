import React, {useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming} from "react-native-reanimated";
const SIZE = 100

const handleRotate = (progress:Animated.SharedValue<number>)=>{
    'worklet';
    return `${2*Math.PI * progress.value}rad`
}

const Animation1: React.FC<{}> = () => {
    const progress:Animated.SharedValue<number> = useSharedValue(.5);
    const scale:Animated.SharedValue<number>    = useSharedValue(1);
    useEffect(()=>{
        progress.value = withRepeat(withTiming(1,{duration:500}),-1,true)
        scale.value = withRepeat(withSpring(1.5),-1,true)
    },[]);
    const style = useAnimatedStyle(()=>({
        opacity:progress.value,
        transform:[{scale:scale.value},{rotate:handleRotate(progress)}]
    }))

    return (
        <View style={styles.container}>
            <Animated.View style={[{
                width:SIZE,
                height:SIZE,
                backgroundColor:'blue'},style]}></Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Animation1
