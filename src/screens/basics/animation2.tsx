import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue, withRepeat,
    withSpring
} from "react-native-reanimated";
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";

const {width,height} = Dimensions.get('window');



const SIZE = 80;
const RADIUS = 200;



type ContextType={
    translateX: number,
    translateY:number
}


const Animation2: React.FC<{}> = () => {
    const translateX:Animated.SharedValue<number> = useSharedValue<number>(0);
    const translateY:Animated.SharedValue<number> = useSharedValue<number>(0)


    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,ContextType>({
        onStart:(event,context)=>{
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive:({translationY,translationX},context)=>{
            translateX.value = translationX + context.translateX
            translateY.value = translationY + context.translateY
        },
        onEnd:()=>{

            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)

            if(
                Math.abs(translateY.value) + SIZE /2 >= height / 2
                || Math.abs(translateX.value) + SIZE / 2 >= width / 2
                || distance < RADIUS / 2
            ){
                     translateX.value = withSpring(0);
                     translateY.value = withSpring(0);
            }

            // const distance = Math.sqrt(translateX.value ** 2+translateY.value ** 2 )
            // if(distance >= width / 2 || distance >= height){
            //     translateX.value = withSpring(0);
            //     translateY.value = withSpring(0);
            // }


        }
    })


    const style = useAnimatedStyle(()=>{
        return {
            transform:[
                {translateX:translateX.value},
                {translateY:translateY.value}
            ]
        }
    })
    return (

        <View style={styles.container}>
                <Animated.View style={styles.circle}>
                    <PanGestureHandler onGestureEvent={onGestureEvent}>
                        <Animated.View style={[styles.square,style]}></Animated.View>
                    </PanGestureHandler>
                </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: {
        width: SIZE,
        height: SIZE,
        borderRadius: 20,
        backgroundColor: 'blue'
    },
    circle: {
        width: RADIUS,
        height: RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS / 2,
        borderWidth: 1
    }
})
export default Animation2
