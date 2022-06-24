import React, {useState, useCallback} from "react"
import {Text, Box, Center, themeTools, useTheme, useColorMode, useColorModeValue, VStack, HStack} from "native-base"
import ThemeToggle from "./theme-toggle";
import TodoItem from './tod-item'

export default function MainScreen() {
    const [checked, setChecked] = useState(false)
    const handlePressCheckBox = useCallback(() => {
        setChecked(prevState => !prevState)
    }, []);
    return (
        <Center
            _dark={{bg: 'blueGray.900'}}
            _light={{bg: 'blueGray.50'}}
            px={4}
            flex={1}
        >
            <VStack space={5} alignItems="center" w="full">
                {/*<TaskItem  isDone={checked} toggleCheckBox={handlePressCheckBox} subject="Task Item"/>*/}
                <TodoItem isDone={checked} toggleCheckBox={handlePressCheckBox} subject="Task Item" />
                <ThemeToggle/>
            </VStack>
        </Center>
    )
}
