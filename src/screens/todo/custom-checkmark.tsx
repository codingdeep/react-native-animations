import React,{useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Animated, {Easing, useAnimatedProps, withTiming} from "react-native-reanimated";
import {Path,PathProps} from 'react-native-svg'
const AnimatedPath = Animated.createAnimatedComponent(Path)
interface CheckMark{
    progress:Animated.SharedValue<number>
}
const CustomCheckMark: React.FC<CheckMark> = ({progress,...pathProps}) => {
    const [length,setLength] = useState(0)
    const ref = React.useRef(null);
    const animatedCheckProps = useAnimatedProps(()=>{
        return {
            strokeDashoffset: Math.max(
                0,
                length - length * Easing.bezierFn(0.16,1,.3,1)(progress.value)
            )
        }
    })
    return (
        <AnimatedPath
            {...pathProps}
            ref={ref}
            animatedProps={animatedCheckProps}
            //@ts-ignore
            onLayout={()=>setLength(ref?.current!.getTotalLength())}
            strokeDasharray={length}
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
export default CustomCheckMark
