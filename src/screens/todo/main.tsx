import React, {useState, useCallback} from "react"
import {Text, Box, Center, themeTools, useTheme, useColorMode, useColorModeValue, VStack, HStack} from "native-base"
import ThemeToggle from "./theme-toggle";
import TodoItem from './tod-item'

import AntDesign from 'react-native-vector-icons/AntDesign'
import shortid from "shortid";
import TodoList from "./todo-list";
import {MotiView} from "moti";
const initialData = [
    {
        id: shortid.generate(),
        subject: 'Buy movie tickets for Friday',
        done: false
    },
    {
        id: shortid.generate(),
        subject: 'Make a react native tutorial',
        done: false
    }
]
export default function MainScreen() {
    const [data,setData] = useState(initialData)
    const [editingItemId,setEditingItemId] = useState<string | null>(null)

    const handleToggleTaskItem = useCallback((item) => {
        setData(prevState => {
            const newData = [...prevState]
            const index = prevState.indexOf(item)
            newData[index] = {
                ...item,
                done: !item.done
            }
            return newData
        })
    }, []);

    const handleChangeTaskItemSubject = useCallback((item,subject)=>{
        setData(prevState => {
            const newData = [...prevState]
            const index = prevState.indexOf(item)
            newData[index] = {
                ...item,
                subject: subject
            }
            return newData
        })
    },[])

    const handleFinishEditingTask = useCallback(item=>{
        setEditingItemId(null)
    },[])

    const handlePressTaskItemLabel=useCallback(item=>{
        setEditingItemId(item.id)
    },[])

    const handleTaskRemoveItem = useCallback((item)=>{
        setData(prevState => {
            const newData = prevState.filter(i => i!==item)
            return newData
        })
    },[])


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

                <TodoList
                    data={data}
                    //editingItem={is}
                    onToggleItem={handleToggleTaskItem}
                    onChangeSubject={handleChangeTaskItemSubject}
                    onFinishEditing={handleFinishEditingTask}
                    onRemoveItem={handleTaskRemoveItem}
                    onPressLabel={handlePressTaskItemLabel}
                    editingItemId={editingItemId} />


                {/*<TodoItem*/}
                {/*    isEditing={isEditing}*/}
                {/*    onChangeSubject={(text)=>setSubject(text)}*/}
                {/*    onFinishEditing={()=>setEditing(false)}*/}
                {/*    onRemove={removeTaskItem}*/}
                {/*    isDone={checked}*/}
                {/*    onPressLabel={()=>setEditing(true)}*/}
                {/*    toggleCheckBox={handlePressCheckBox}*/}
                {/*    subject={subject}/>*/}
                <ThemeToggle/>
            </VStack>
        </Center>
    )
}
