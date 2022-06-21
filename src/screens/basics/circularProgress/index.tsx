import React, {useEffect} from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import Svg, {Circle} from "react-native-svg";
import Animated, {useAnimatedProps, useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";
import {ReText} from "react-native-redash";

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#041128';
const {width, height} = Dimensions.get('window');
const CIRCLE_LENGTH = 500;
const R = CIRCLE_LENGTH / (2 * Math.PI)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const CircularProgressBar: React.FC<{}> = () => {
    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = withTiming(1, {duration: 2000})
    }, []);


    const animatedStrokeProps = useAnimatedProps(() => (
        {
            strokeDashoffset: CIRCLE_LENGTH * (1- progress.value)
        }
    ))
    const progressText = useDerivedValue(()=>{
        return `${Math.floor(progress.value * 100)}`;
    })
    // const progressText = useDerivedValue(() => {
    //     return `${Math.floor(progress.value * 100)}`;
    // });
    return (
        <View style={styles.container}>
            <ReText style={styles.text} text={progressText} />
            <Svg style={{position:'absolute'}}>
                <Circle
                    cx={width / 2}
                    cy={height / 2}
                    r={R}
                    stroke={BACKGROUND_STROKE_COLOR}
                    strokeWidth={15}
                />
                <Circle
                    cx={width / 2}
                    cy={height / 2}
                    r={R}
                    stroke={STROKE_COLOR}
                    strokeWidth={13}
                />
                <AnimatedCircle
                    cx={width / 2}
                    cy={height / 2}
                    r={R}
                    stroke="#fff"
                    strokeWidth={14}
                    strokeDasharray={CIRCLE_LENGTH}
                    animatedProps={animatedStrokeProps}
                    strokeLinecap={'round'}
                />
            </Svg>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: BACKGROUND_COLOR
    },
    text:{
        fontSize: 20,
        fontWeight:'bold'
    }
})
export default CircularProgressBar
