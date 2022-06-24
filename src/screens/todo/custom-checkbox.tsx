import React,{useEffect} from 'react'
import Svg,{Path} from 'react-native-svg'
import Animated, {
    Easing,
    interpolateColor,
    useAnimatedProps,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import CustomCheckMark from "./custom-checkmark";

interface Checkbox{
    checked: boolean,
    highlightColor: string,
    checkMarkColor: string,
    boxStroke: string
}

const MARGIN = 10
const vWidth =  64 + MARGIN
const vHeight = 64 + MARGIN

const checkMarkPath =
    'M15 31.1977C23.1081 36.4884 29.5946 43 29.5946 43C29.5946 43 37.5 25.5 69 1.5'
const outlineBoxPath =
    'M24 0.5H40C48.5809 0.5 54.4147 2.18067 58.117 5.88299C61.8193 9.58532 63.5 15.4191 63.5 24V40C63.5 48.5809 61.8193 54.4147 58.117 58.117C54.4147 61.8193 48.5809 63.5 40 63.5H24C15.4191 63.5 9.58532 61.8193 5.88299 58.117C2.18067 54.4147 0.5 48.5809 0.5 40V24C0.5 15.4191 2.18067 9.58532 5.88299 5.88299C9.58532 2.18067 15.4191 0.5 24 0.5Z'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const CustomCheckbox:React.FC<Checkbox>=({checked,checkMarkColor,highlightColor,boxStroke})=>{
    const progress:Animated.SharedValue<number> = useSharedValue(0)

    useEffect(() => {
        progress.value = withTiming(
            checked ? 1 : 0,
            {duration: checked ? 300 : 100, easing: Easing.linear}
        )
    }, [checked]);

    const animatedCheckBoxProps = useAnimatedProps(()=>{
        return {
            stroke: interpolateColor(
                Easing.bezierFn(0.16,1,.3,1)(progress.value),
                [0,1],
                [boxStroke,highlightColor],
                'RGB'
            ),
            fill:interpolateColor(
                Easing.bezierFn(0.16,1,.3,1)(progress.value),
                [0,1],
                ['#00000000',highlightColor]
            )
        }
    })

    return(
        <Svg viewBox={[-MARGIN, -MARGIN, vWidth +MARGIN, vHeight +MARGIN].join(' ')}>
            <AnimatedPath
                stroke="#000"
                strokeWidth={7}
                d={outlineBoxPath}
                animatedProps={animatedCheckBoxProps}
            />
            <CustomCheckMark
                progress={progress}
                stroke={checkMarkColor}
                strokeWidth={7}
                d={checkMarkPath}
                strokeLinecap="round"
                strokeJoincap="round"
                strokeOpacity={checked || false ? 1 : 0}
            />
        </Svg>
    )
}
export default CustomCheckbox;
