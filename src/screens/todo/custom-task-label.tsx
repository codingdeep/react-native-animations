import React, {useEffect} from "react";
import {HStack, Box, Text} from "native-base";
import Animated, {
    withTiming,
    Easing,
    useAnimatedStyle,
    withSequence,
    withDelay,
    useSharedValue, interpolateColor
} from "react-native-reanimated";
import {Pressable} from "react-native";

const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedText = Animated.createAnimatedComponent(Text)

interface CustomLabel {
    checked: boolean,
    subject: string,
    activeTextColor: string,
    inactiveColor: string,
    strikeThrough: string,
    onPressLabel?: () => void
}

const CustomTaskLabel: React.FC<CustomLabel> = ({
                                                    checked,
                                                    subject,
                                                    activeTextColor,
                                                    strikeThrough,
                                                    inactiveColor,
                                                    onPressLabel
                                                }) => {
    const HStackTranslation = useSharedValue(0);
    const SubjectColor = useSharedValue(0)
    const BorderWidth = useSharedValue(0);

    useEffect(() => {
        const easing = Easing.out(Easing.quad)
        if (checked) {
            HStackTranslation.value = withSequence(
                withTiming(10, {duration: 400, easing}),
                withTiming(0, {duration: 400, easing})
            )
            SubjectColor.value = withDelay(
                400,
                withTiming(1, {duration: 400, easing})
            );
            BorderWidth.value = withTiming(1, {duration: 500, easing})
        } else {
            SubjectColor.value = withTiming(0, {duration: 400, easing});
            BorderWidth.value = withTiming(0, {duration: 400, easing})
        }
    }, [checked]);

    const HStackStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: HStackTranslation.value}]
        }
    });
    const SubjectColorStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(
                SubjectColor.value,
                [0, 1],
                [activeTextColor, inactiveColor]
            )
        }
    });

    const borderWidthStyle = useAnimatedStyle(() => {
        return {
            width: `${BorderWidth.value * 100}%`
        }
    })

    return (
        <Pressable onPress={onPressLabel}>
            <AnimatedHStack style={[HStackStyle, {alignItems: 'center'}]}>
                <AnimatedText style={SubjectColorStyle}>{subject}</AnimatedText>
                <AnimatedBox
                    style={[borderWidthStyle]}
                    position="absolute"
                    h={1}
                    borderBottomWidth={1}
                    borderBottomColor={inactiveColor}/>
            </AnimatedHStack>
        </Pressable>
    )
}

export default CustomTaskLabel
