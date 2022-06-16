import React from "react";
import {View, Text, StyleSheet, Image, Dimensions} from "react-native";
import {PinchGestureHandler, PinchGestureHandlerGestureEvent} from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring, withTiming
} from "react-native-reanimated";
const {width, height} = Dimensions.get('window')
const PinGesture: React.FC<{}> = () => {

    const scale:Animated.SharedValue<number> = useSharedValue<number>(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0)

    const pinchGesture = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onActive:(event, context)=>{
           scale.value = event.scale;
           focalX.value = event.focalX;
           focalY.value = event.focalY
        },
        onEnd:()=>{
            scale.value = withTiming(1)
        }
    })
    const style = useAnimatedStyle(()=>{
        return{
            transform:[
                {translateX:focalX.value},
                {translateY:focalY.value},
                {translateX: -width / 2},
                {translateY: -height / 2},
                {scale: scale.value},
                {translateX:-focalX.value},
                {translateY:-focalY.value},
                {translateX: width / 2},
                {translateY: height / 2},
            ]
        }
    })

    return (
       <PinchGestureHandler onGestureEvent={pinchGesture}>
           <Animated.Image style={[{...StyleSheet.absoluteFillObject,width:'100%',height: '100%',top: 0,right: 0, bottom: 0,left: 0},style]} source={require('../../assets/pin.jpeg')} />
       </PinchGestureHandler>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default PinGesture
