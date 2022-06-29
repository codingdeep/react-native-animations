import React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {ItemProps} from "./Model";
import Animated, {Extrapolation, interpolate, useAnimatedStyle} from "react-native-reanimated";

interface Props {
    item: ItemProps,
    y: Animated.SharedValue<number>,
    index:number
}

const {width, height} = Dimensions.get('window');
export const MIN_HEIGHT = 128;
export const MAX_HEIGHT = height / 2
const Item: React.FC<Props> = ({y, index, item: {picture, title, subtitle}}) => {
    console.log(y)

    const container = useAnimatedStyle(()=>({
        height: interpolate(
            -y.value,
            [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
            [MIN_HEIGHT, MAX_HEIGHT],
            Extrapolation.CLAMP
        ),
        transform:[{translateY: y.value}]
    }))

    const sTitle = useAnimatedStyle(()=>({
        opacity:interpolate(
            -y.value,
            [(index-1) * MAX_HEIGHT, index * MAX_HEIGHT],
            [0, 1],
            Extrapolation.CLAMP
        )
    }))

    return (
        <Animated.View style={[styles.container, container]}>
            <Image style={styles.picture} source={picture}/>
            <View style={styles.titleContainer}>
                <Text style={styles.subtitle}>{subtitle.toUpperCase()}</Text>
                <View style={styles.mainTitle}>
                    <Animated.View style={sTitle}>
                        <Text style={styles.title}>{title.toUpperCase()}</Text>
                    </Animated.View>
                </View>
            </View>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: MAX_HEIGHT,
        width: width,
        justifyContent: "flex-end",
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    picture: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined
    },
    titleContainer: {
        maxHeight: MAX_HEIGHT * 0.62,
        justifyContent: "center",
        flex: 1,
    },
    subtitle: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        color: "white",
        textAlign: "center",
        fontSize: 32,
        fontWeight: "500",
    },
    mainTitle: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        padding: 32,
        transform: [{ translateY: 64 }],
    },
})
export default Item
