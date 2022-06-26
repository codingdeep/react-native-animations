import React, {useCallback} from "react";
import {NativeSyntheticEvent, Pressable, TextInputChangeEventData} from "react-native";
import {Box, Input, Icon, HStack, themeTools, useColorModeValue} from "native-base";
import CustomCheckbox from "./custom-checkbox";
import theme from "../../theme";
import CustomTaskLabel from "./custom-task-label";
import CustomSwipeAble from "./custom-swipeable";
import Feather from 'react-native-vector-icons/Feather'
import {PanGestureHandlerProps} from "react-native-gesture-handler";
interface Todo extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    isEditing?:boolean,
    isDone: boolean,
    toggleCheckBox: () => void,
    subject: string,
    onPressLabel?:()=>void,
    onRemove?:()=>void,
    onChangeSubject?:(subject:string) => void,
    onFinishEditing?:()=>void
}


const TodoItem: React.FC<Todo> = ({isEditing,isDone, toggleCheckBox,onRemove, subject, simultaneousHandlers, onChangeSubject, onFinishEditing,onPressLabel}) => {

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

    const changeSubjectHandler= useCallback((e:NativeSyntheticEvent<TextInputChangeEventData>)=>{
        onChangeSubject && onChangeSubject(e.nativeEvent.text)
    },[onChangeSubject])


    return (
        <CustomSwipeAble
            onSwipeLeft={onRemove}
            simultaneousHandlers={simultaneousHandlers}
            backView={
                <Box w="full" h="full" bg="red.500" alignItems="flex-end" pr={4} justifyContent="center">
                    <Icon color="white" as={<Feather name="trash-2" />} size={19} />
                </Box>
            }
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
                {isEditing  ? (
                    <Input
                        placeholder="Task"
                        variant="unstyled"
                        px={1}
                        py={0}
                        autoFocus
                        blurOnSubmit
                        onChange={changeSubjectHandler}
                        value={subject}
                        onBlur={onFinishEditing}
                    />
                ):(
                    <CustomTaskLabel
                        onPressLabel={onPressLabel}
                        checked={isDone}
                        subject={subject}
                        activeTextColor={activeTextColor}
                        inactiveColor={doneTextColor}
                        strikeThrough={strikeThrough}
                    />
                )}

            </HStack>
        </CustomSwipeAble>
    )
}

export default TodoItem
