import React, {useRef, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Animated, {Easing, useAnimatedProps} from "react-native-reanimated";
import {Path,PathProps} from "react-native-svg";
interface Props{
    progress: Animated.SharedValue<number>
}
const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCheckmark: React.FC<Props> = ({progress,...pathProps}) => {
    const [length,setLength] = useState(0)
    const ref = useRef(null);
    const animatedCheckmarkProps = useAnimatedProps(()=>{
        return {
            strokeDashoffset: Math.max(
                0,
                length - length * Easing.bezierFn(0.16,1,.3,1)(progress.value)
            )
        }
    })
    return (
        <AnimatedPath
            ref={ref}
            //@ts-ignore
            onLayout={()=>setLength(ref.current!.getTotalLength())}
            strokeDasharray={length}
            animatedProps={animatedCheckmarkProps}
            {...pathProps}
        />
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default AnimatedCheckmark
