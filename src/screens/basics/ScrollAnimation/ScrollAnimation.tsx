import React from "react";
import {View, StatusBar, StyleSheet, ScrollView} from "react-native";
import Animated, {useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated";
import {ItemProps, items} from "./Model";
import Item from "./item";
import {MAX_HEIGHT} from "./item";

const ScrollAnimation: React.FC<{}> = () => {
    const y:Animated.SharedValue<number> = useSharedValue<number>(0);

    // const onScroll = useAnimatedScrollHandler({
    //     onScroll: ({contentOffset:{y:value}})=>{
    //         y.value = value
    //     }
    // })
    //
    const onScroll = useAnimatedScrollHandler(event=>{
        y.value = event.contentOffset.y
    })

    return (
        <>
           <StatusBar hidden />
            <Animated.ScrollView
                scrollEventThrottle={16}
                onScroll={onScroll}
                style={styles.scrollView}
                snapToInterval={MAX_HEIGHT}
                decelerationRate="fast"
                pagingEnabled
                contentContainerStyle={{height: (items.length + 1) * MAX_HEIGHT}}
            >
                <View style={styles.container}>
                    {items.map((item:ItemProps, index:number)=>{
                        return <Item y={y} index={index} item={item} key={index} />
                    })}
                </View>
            </Animated.ScrollView>
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
export default ScrollAnimation
