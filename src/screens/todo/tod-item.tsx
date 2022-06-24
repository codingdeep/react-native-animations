import React from "react";
import {Pressable, StyleSheet} from "react-native";
import {Box,View,Text, HStack,themeTools, useColorModeValue} from "native-base";
import CustomCheckbox from "./custom-checkbox";
import theme from "../../theme";
interface Todo{
    isDone: boolean,
    toggleCheckBox:()=>void,
    subject: string
}



const TodoItem: React.FC<Todo> = ({isDone,toggleCheckBox, subject}) => {

    const highlightColor = themeTools.getColor(
        theme,
        useColorModeValue('blue.500','blue.400')
    )
    const boxStroke = themeTools.getColor(
        theme,
        useColorModeValue('muted.400','muted.400')
    )
    const activeTextColor = themeTools.getColor(
        theme,
        useColorModeValue('darkText','lightText')
    )
    const doneTextColor = themeTools.getColor(
        theme,
        useColorModeValue('muted.400','muted.300')
    )
    const checkMarkColor = themeTools.getColor(
        theme,
        useColorModeValue('white','white')
    )

    return (
        <HStack alignItems="center" space={2}>
            <Box w={100} h={100}>
                <Pressable onPress={toggleCheckBox}>
                    <CustomCheckbox
                        highlightColor={highlightColor}
                        checkMarkColor={checkMarkColor}
                        boxStroke={boxStroke}
                        checked={isDone} />
                </Pressable>
            </Box>
            <Text>{subject}</Text>
        </HStack>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default TodoItem
