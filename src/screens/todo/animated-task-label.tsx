import React, {useEffect, memo} from "react";
import {Pressable, StyleSheet} from "react-native";
import {Text, HStack, Box} from "native-base";
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSequence,
    interpolateColor, useAnimatedProps
} from "react-native-reanimated";


const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedText = Animated.createAnimatedComponent(Text)

interface Props {
    strikethrough: boolean,
    textColor: string,
    inactiveTextColor: string,
    onPress: () => void,
    children?: React.ReactNode
}


const AnimatedTakLabel: React.FC<Props> = memo(({strikethrough, textColor, inactiveTextColor, onPress, children}) => {
    const HstackOffset = useSharedValue(0);
    const taskColorProgress = useSharedValue(0)
    const borderWidth = useSharedValue(0);
    const animatedBorderColor = useSharedValue(0);
    useEffect(() => {
        const easing = Easing.out(Easing.quad)
        if(strikethrough){
            HstackOffset.value = withSequence(
                withTiming(4,{duration: 200, easing}),
                withTiming(0,{duration: 200, easing})
            )
            taskColorProgress.value = withDelay(
                500,
                withTiming(1,{duration: 400, easing})
            )
            borderWidth.value = withDelay(
                100,
                withTiming(1,{duration: 400, easing})
            )
            animatedBorderColor.value = withDelay(
                100,
                withTiming(1,{duration: 400, easing})
            )
        }else {
            taskColorProgress.value = withTiming(0,{duration: 400, easing})
            borderWidth.value = withTiming(0,{duration: 400, easing})
            animatedBorderColor.value = withTiming(0,{duration: 400, easing})
        }
    }, [strikethrough]);

    const hstackAnimatedStyles = useAnimatedStyle(()=>{
        return {
            transform:[{translateX: HstackOffset.value}]
        }
    },[strikethrough])

    const borderWidthAnimatedStyle = useAnimatedStyle(()=>{
        return {
            width: `${borderWidth.value * 100}%`
        }
    })

    const textColorAnimatedStyles = useAnimatedStyle(()=>{
        return{
            color: interpolateColor(
                taskColorProgress.value,
                [0,1],
                [textColor,inactiveTextColor]
            )
        }
    },[strikethrough,textColor,inactiveTextColor])

    const borderColorProps = useAnimatedProps(()=>{
        return {
            borderBottomColor: interpolateColor(
                animatedBorderColor.value,
                [0, 1],
                ['#ddd','red']
            )
        }
    })

    return (
        <Pressable onPress={onPress}>
            <AnimatedHStack alignItems="center" style={hstackAnimatedStyles}>
                <AnimatedText style={textColorAnimatedStyles} fontSize={19} noOfLines={1} isTruncated px={1}>
                    {children}
                </AnimatedText>
                <AnimatedBox  style={[borderWidthAnimatedStyle]} position="absolute" h={1} borderBottomWidth={1} animatedProps={borderColorProps} />
            </AnimatedHStack>
        </Pressable>
    )
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default AnimatedTakLabel
