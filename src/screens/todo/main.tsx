import React, {useState, useCallback} from "react"
import {Text, Box, Center, themeTools, useTheme, useColorMode, useColorModeValue, VStack, HStack} from "native-base"
import ThemeToggle from "./theme-toggle";
import TodoItem from './tod-item'

export default function MainScreen() {
    const [checked, setChecked] = useState(false)
    const [isEditing,setEditing] = useState(false)
    const [subject, setSubject] = useState('Task Item')
    const handlePressCheckBox = useCallback(() => {
        setChecked(prevState => !prevState)
    }, []);

    const removeTaskItem=()=>{
        //alert('ok')
    }

    return (
        <Center
            _dark={{bg: 'blueGray.900'}}
            _light={{bg: 'blueGray.50'}}
            px={4}
            flex={1}
        >
            <VStack space={5} alignItems="center" w="full">
                {/*<TaskItem  isDone={checked} toggleCheckBox={handlePressCheckBox} subject="Task Item"/>*/}
                <TodoItem
                    isEditing={isEditing}
                    onChangeSubject={(text)=>setSubject(text)}
                    onFinishEditing={()=>setEditing(false)}
                    onRemove={removeTaskItem}
                    isDone={checked}
                    onPressLabel={()=>setEditing(true)}
                    toggleCheckBox={handlePressCheckBox}
                    subject={subject}/>
                <ThemeToggle/>
            </VStack>
        </Center>
    )
}
