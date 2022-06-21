import React, {Fragment, useRef, useState} from "react";
import {View, Text, StyleSheet, Dimensions, Image} from "react-native";
import {styles as Style} from "./carSlide";
import Box from "./box";
import CarSlide from "./carSlide";

import {Data, data} from "./data";
import Logo from "./logo";
import Animated, {
    Easing,
    Extrapolation,
    interpolate, multiply, runOnJS, useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring, withTiming
} from 'react-native-reanimated';
import {
    TapGestureHandler,
    State,
    TapGestureHandlerGestureEvent
} from 'react-native-gesture-handler';

const {width:WIDTH,height} = Dimensions.get('window');
export {WIDTH}
export const BORDER_RADIUS = 78
const CarAnimation: React.FC<{}> = () => {
    const buttonOpacity = useSharedValue(0);
    const scrollX = useSharedValue(0)
    const [login, setLogin] = useState(false);

    const onStateChange = ((event:TapGestureHandlerGestureEvent)=>{
        if(event.nativeEvent.state == State.END){
            buttonOpacity.value = withTiming(1,{duration: 500})
            runOnJS(setLogin)(true)
        }else{
            buttonOpacity.value = withTiming(0,{duration: 500})
        }
    })

    const animatedStyles = useAnimatedStyle(() => {
        const scale = interpolate(buttonOpacity.value, [0, 1], [height * 0.7, height * 0.95], { extrapolateRight: Extrapolation.CLAMP });

        return {
            height: scale,
        };
    });

    const scrollHandler= useAnimatedScrollHandler(event=>{
        scrollX.value = withSpring(event.contentOffset.x)
    })

    const sStyle = useAnimatedStyle(()=>(
        {
            transform:[{translateX: -scrollX.value}]
        }
    ))


    return (
        <Box>
            <Animated.View  style={[styles.topSlide,animatedStyles]}>
                <Animated.View style={{alignItems:'center',flex: 1}}>
                    <Logo />
                </Animated.View>
                <View style={{flex: 1}}>
                    <Animated.View style={[{
                        width:WIDTH * data.length - 1,
                        flexDirection:'row',
                        height: 100,
                        alignItems:'center',
                        justifyContent:'center'
                    },sStyle]}>
                        {data.map(({carname,image,carsspeed},index)=> {

                            return <View style={{
                                flex: 1, width: WIDTH, alignItems: 'center',
                                justifyContent: 'center', backgroundColor: '#fff', height: 100
                            }}>
                                <CarSlide carname="" image={image} />
                            </View>
                        })}
                    </Animated.View>
                </View>
                <Animated.View>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize: 20,fontWeight:'bold'}}>Effect</Text>
                    </View>
                    <TapGestureHandler onHandlerStateChange={onStateChange}>
                        <Animated.View style={[{
                            width:WIDTH * data.length - 1,
                            flexDirection:'row',
                            height: 50,
                            alignItems:'center',
                            justifyContent:'center'
                        },sStyle]}>
                            {data.map(({carname,image,carsspeed},index)=>(
                                <View style={{flex: 1,width: WIDTH,alignItems:'center',
                                    justifyContent:'center'}}>
                                    <Text style={{fontSize: 16}}>{carsspeed}</Text>
                                </View>
                            ))}
                        </Animated.View>
                    </TapGestureHandler>
                </Animated.View>
            </Animated.View>
            <Animated.ScrollView
                onScroll={scrollHandler}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                snapToInterval={WIDTH}
                snapToAlignment="center"
                decelerationRate="fast"
            >
                {data.map(({carname,image},index)=>(
                    <Fragment key={index}>
                        <CarSlide {...{carname,image}} />
                    </Fragment>
                ))}
            </Animated.ScrollView>
        </Box>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topSlide:{
        borderBottomLeftRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
        backgroundColor: '#ddd',
        overflow:'hidden',
        flexDirection: 'column',
        justifyContent:'flex-end'
    }
})
export default CarAnimation
