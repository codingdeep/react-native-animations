import React, {useState} from 'react';
import Animated, {
    useAnimatedStyle,
    useAnimatedProps,
    Easing,
    interpolate,
    interpolateColor
} from "react-native-reanimated";
import {Path, PathProps} from "react-native-svg";

const AnimPath = Animated.createAnimatedComponent(Path)

interface Props extends PathProps {
    progress: Animated.SharedValue<number>,
    opacity: Animated.SharedValue<number>,
    index: number
}

const colors = ['#FFC27A', '#7EDAB9', '#45A6E5', '#FE8777']
const AnimatedPath: React.FC<Props> = ({progress, index,opacity, ...pathProps}) => {
    const stroke = colors[Math.round(Math.random() * colors.length - 1)]
    const [length, setLength] = useState(0);
    const ref = React.useRef<typeof AnimPath>(null)
    const animatedBgStrokeProps = useAnimatedProps(() => {

        return {
            strokeDashoffset: Math.max(
                0,
                length - length * Easing.bezierFn(0.61, 1, .88, 1)(progress.value)
            ),
            fill:interpolateColor(
                Easing.bezierFn(0.61, 1, .88, 1) (opacity.value),
                [0, 1],
                ['transparent', stroke || 'red'],
                'RGB'
            )
        }
    })
    const animatedStrokeProps = useAnimatedProps(() => {

        return {
            strokeDashoffset: Math.max(
                0,
                length - length * Easing.bezierFn(0.65, 0, .35, 1)(progress.value)
            ),
            fill:interpolateColor(
                Easing.bezierFn(0.65, 0, .35, 1) (progress.value),
                [0, 1],
                ['transparent', '#0099ff'],
                'RGB'
            )
        }
    })

    return (
        <>
            <AnimPath
                stroke={stroke}
                {...pathProps}
                ref={ref}
                //@ts-ignore
                onLayout={() => setLength(ref.current?.getTotalLength())}
                strokeDasharray={length}
                animatedProps={animatedBgStrokeProps}

            />
            <AnimPath
                stroke="black"
                {...pathProps}
                ref={ref}
                //@ts-ignore
                onLayout={() => setLength(ref.current?.getTotalLength())}
                strokeDasharray={length}
                animatedProps={animatedStrokeProps}

            />
        </>
    )
}
export default AnimatedPath
