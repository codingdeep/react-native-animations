import React from "react";
import {Pressable, StyleSheet} from "react-native";
import {Box, View, Text, HStack, themeTools, useColorModeValue} from "native-base";
import CustomCheckbox from "./custom-checkbox";
import theme from "../../theme";
import CustomTaskLabel from "./custom-task-label";
import CustomSwipeAble from "./custom-swipeable";
import Feather from 'react-native-vector-icons/Feather'
import {PanGestureHandlerProps} from "react-native-gesture-handler";
interface Todo extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    isDone: boolean,
    toggleCheckBox: () => void,
    subject: string,
    onPressLabel?:()=>void,
    onRemove?:()=>void
}


const TodoItem: React.FC<Todo> = ({isDone, toggleCheckBox,onRemove, subject, simultaneousHandlers}) => {

    const highlightColor = themeTools.getColor(
        theme,
        useColorModeValue('blue.500', 'blue.400')
    )
    const boxStroke = themeTools.getColor(
        theme,
        useColorModeValue('muted.400', 'muted.400')
    )
    const activeTextColor = themeTools.getColor(
        theme,
        useColorModeValue('darkText', 'lightText')
    )
    const doneTextColor = themeTools.getColor(
        theme,
        useColorModeValue('muted.400', 'muted.300')
    )
    const strikeThrough = themeTools.getColor(
        theme,
        useColorModeValue('muted.400', 'muted.300')
    )
    const checkMarkColor = themeTools.getColor(
        theme,
        useColorModeValue('white', 'white')
    )

    return (
        <CustomSwipeAble
            onSwipeLeft={onRemove}
            simultaneousHandlers={simultaneousHandlers}
        >
            <HStack
                alignItems="center"
                space={2}
                px={4}
                py={2}
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                w="full">
                <Box w={30} h={30}>
                    <Pressable onPress={toggleCheckBox}>
                        <CustomCheckbox
                            highlightColor={highlightColor}
                            checkMarkColor={checkMarkColor}
                            boxStroke={boxStroke}
                            checked={isDone}/>
                    </Pressable>
                </Box>
                <CustomTaskLabel
                    checked={isDone}
                    subject={subject}
                    activeTextColor={activeTextColor}
                    inactiveColor={doneTextColor}
                    strikeThrough={strikeThrough}
                />
            </HStack>
        </CustomSwipeAble>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default TodoItem
