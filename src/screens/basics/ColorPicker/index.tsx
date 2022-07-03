import React, {useCallback} from 'react'
import {VStack, Box, Text} from 'native-base'
import ColorSliding from './colorSliding'
import {Dimensions, View} from "react-native";
import {ReText} from "react-native-redash";
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated";

const COLORS = [
    'red',
    'blue',
    'cyan',
    'green',
    'yellow',
    'orange',
    'black',
    'white'
]
const {width} = Dimensions.get('window');
const PICKER_WIDTH = width * 0.9

const AnimatedView = Animated.createAnimatedComponent(View)

const ColorPicker: React.FC<{}> = () => {
    const colorName = useSharedValue(COLORS[0])
    const bgStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor: colorName.value
        }
    })
    const onChange=useCallback((color)=>{
        "worklet";
        colorName.value = color
    },[])

    return (
        <>
            <AnimatedView style={[{width: 200, height: 200},bgStyle]}>

            </AnimatedView>
            <Box flex={1} alignItems="center" justifyContent="flex-end" py={30}>
                <ColorSliding
                    colors={COLORS}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    max_picker_width={PICKER_WIDTH}
                    style={{width: PICKER_WIDTH, height: 20, borderRadius: 40}}
                    changeColor={onChange}
                />
            </Box>
        </>
    )
}
export default ColorPicker
