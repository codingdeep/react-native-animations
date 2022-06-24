import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import {Box, HStack, Icon, themeTools, useColorModeValue} from 'native-base'
import theme from "../../theme";
import {AnimatedCheckBox} from "./animated-checkbox";
import AnimatedTaskLabel from "./animated-task-label";
import SwipeAbleView from "./swipeable-view";
import Feather from 'react-native-vector-icons/Feather'
import {PanGestureHandlerProps} from "react-native-gesture-handler";

interface TaskProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    isDone: boolean,
    toggleCheckBox: () => void,
    onPressLabel?: () => void,
    onRemove?: () => void;
    subject: string
}

const TaskItem: React.FC<TaskProps> = ({
                                           isDone,
                                           toggleCheckBox,
                                           onPressLabel,
                                           onRemove,
                                           subject,
                                          simultaneousHandlers
                                       }) => {
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
        <SwipeAbleView
            simultaneousHandlers={simultaneousHandlers}
            onSwipeLeft={onRemove}
            backView={<Box w="full" h="full" bg="red.500" alignItems="flex-end" justifyContent="center">
                <Icon color="white" as={<Feather name="trash-2" />} size="sm" />
            </Box>}
        >
            <HStack w="full" bg="white" alignItems="center">
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
                    {subject}
                </AnimatedTaskLabel>
            </HStack>
        </SwipeAbleView>
    )
}
export default TaskItem
