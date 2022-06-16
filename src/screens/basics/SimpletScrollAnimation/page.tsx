import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from "react-native-reanimated";
const {width,height} = Dimensions.get('window')
interface PageProps{
    title:string,
    index: number,
    translateX:Animated.SharedValue<number>
}
const SIZE = width * .7
const Page: React.FC<PageProps> = ({title,index,translateX}) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

    const style=useAnimatedStyle(()=>{

        const scale = interpolate(
            translateX.value,
            inputRange,
            [0,1,0],
            Extrapolate.CLAMP
        )

        const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0,SIZE/2,0],
        )

        return{
            transform:[{scale}],
            borderRadius
        }
    });
    const TextStyle = useAnimatedStyle(()=>{
        const translatey = interpolate(
            translateX.value,
            inputRange,
            [-550,0,550],
        )

        return{
            transform:[{translateY:translatey}]
        }

    })

    return (
        <View style={[styles.container,{backgroundColor:`rgba(0,0,256,0.${index})`}]}>
            <Animated.View style={[styles.square,style]}>
                <Animated.View style={[styles.TextView,TextStyle]}>
                    <Text style={styles.TextStyle}>{title}</Text>
                </Animated.View>
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height
    },
    square:{
        width: SIZE,
        height: SIZE,
        backgroundColor:'rgba(0,0,256,.4)',
        justifyContent:'center',
        overflow:'hidden'
    },
    TextView:{
        position:'absolute',
        alignSelf:'center'
    },
    TextStyle:{
        fontSize: 60,
        color:'#fff',
        fontWeight: '700'
    }
})
export default Page
