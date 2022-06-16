import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import {transform} from "@babel/core";

interface PageType{
    title: string,
    index: string,
    translateX: Animated.SharedValue<number>
}
const {width: PAGE_WIDTH} = Dimensions.get('window');
const Page: React.FC<PageType> = ({title,index,translateX}) => {
    const pageOffset = PAGE_WIDTH * Number(index);
    const rStyle = useAnimatedStyle(()=>(
        {transform:[{translateX:translateX.value + pageOffset}]}
    ))
    return (
        <Animated.View style={[{...StyleSheet.absoluteFillObject,flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:`rgba(0,0,255,0.${index+8})`},rStyle]}><Text style={{fontSize: 60,fontWeight:'bold'}}>{title.toUpperCase()}</Text></Animated.View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export {PAGE_WIDTH}
export default Page
