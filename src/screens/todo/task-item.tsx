import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import {Box, HStack, themeTools, useColorModeValue} from 'native-base'
import theme from "../../theme";
import {AnimatedCheckBox} from "./animated-checkbox";
import AnimatedTaskLabel from "./animated-task-label";

interface TaskProps {
    isDone: boolean,
    toggleCheckBox: () => void,
}

const TaskItem: React.FC<TaskProps> = ({isDone, toggleCheckBox}) => {
    const highlightColor = themeTools.getColor(
        theme,
        useColorModeValue('blue.500', 'blue.400')
    )
    const boxStroke = themeTools.getColor(
        theme,
        useColorModeValue('muted.300', 'mute.500')
    )
    const checkmarkColor = themeTools.getColor(
        theme,
        useColorModeValue('white', 'white')
    )
    const activeTextColor = themeTools.getColor(
        theme,
        useColorModeValue('darkText', 'lightText')
    )
    const doneTextColor = themeTools.getColor(
        theme,
        useColorModeValue('muted.400', 'muted.600')
    )

    return (
        <HStack alignItems="center">
            <Box width={30} height={30} mr={2}>
                <Pressable onPress={toggleCheckBox}>
                    <AnimatedCheckBox
                        checked={isDone}
                        checkmarkColor={checkmarkColor}
                        boxOutlineColor={boxStroke}
                        highlightColor={highlightColor}
                    />
                </Pressable>
            </Box>
            <AnimatedTaskLabel
                strikethrough={isDone}
                textColor={activeTextColor}
                inactiveTextColor={doneTextColor}
                onPress={toggleCheckBox}>
                Task Item
            </AnimatedTaskLabel>
        </HStack>
    )
}
export default TaskItem