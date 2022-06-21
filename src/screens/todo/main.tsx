import React, {useState, useCallback} from "react"
import {Text, Box, Center, themeTools, useTheme, useColorMode, useColorModeValue, VStack, HStack} from "native-base"
import ThemeToggle from "./theme-toggle";
import {AnimatedCheckBox} from "./animated-checkbox";
import {Pressable} from "react-native";
import TaskItem from "./task-item";

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
            <VStack space={5} alignItems="center">
                <TaskItem  isDone={checked} toggleCheckBox={handlePressCheckBox}/>
                <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
                    <Text>Hello</Text>
                </Box>
                <ThemeToggle/>
            </VStack>
        </Center>
    )
}
