import React, {useEffect} from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import Svg, {Circle} from "react-native-svg";
import Animated, {useAnimatedProps, useSharedValue, withTiming} from "react-native-reanimated";
import {ReText} from "react-native-redash";

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const CIRCLE_LENGTH = 800;
const R = CIRCLE_LENGTH / (2 * Math.PI)
const STROKE_COLOR = '#1c09d0'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const ProgressBar: React.FC<{}> = () => {

    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = withTiming(1, {duration: 2000})
    }, []);

    const animatedCircleProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: CIRCLE_LENGTH - CIRCLE_LENGTH * progress.value
        }
    })

    return (
        <View style={styles.container}>
            <ReText style={{position:'absolute'}} text={progress}/>
            <Svg>
                <Circle cx={WIDTH / 2} cy={HEIGHT / 2} r={R} strokeWidth={15} stroke={STROKE_COLOR}/>
                <AnimatedCircle
                    cx={WIDTH / 2}
                    cy={HEIGHT / 2}
                    r={R}
                    strokeWidth={14}
                    stroke="#fff"
                    animatedProps={animatedCircleProps}
                    strokeDasharray={CIRCLE_LENGTH}
                />
            </Svg>
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
export default ProgressBar
