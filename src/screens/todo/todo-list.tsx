import React, {useCallback, useRef} from 'react'
import {AnimatePresence, View} from 'moti'
import {Box, ScrollView} from 'native-base'
import TodoItem from "./tod-item";
import {PanGestureHandler, PanGestureHandlerProps} from 'react-native-gesture-handler'
import StyledCom from "../../utils/styledhoc";

const StyledView = StyledCom(View)
const StyledScrollView = StyledCom(ScrollView)

interface TaskItemData {
    id: string,
    subject: string,
    done: boolean
}

interface TaskListProps {
    data: Array<TaskItemData>,
    onToggleItem: (item: TaskItemData) => void,
    onChangeSubject: (item: TaskItemData, newSubject: string) => void,
    onFinishEditing: (item: TaskItemData) => void,
    onRemoveItem: (item: TaskItemData) => void,
    onPressLabel: (item: TaskItemData) => void,
    editingItemId: string | null
}

interface TaskItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    data: TaskItemData,
    isEditing: boolean,
    onToggleItem: (item: TaskItemData) => void,
    onChangeSubject: (item: TaskItemData, newSubject: string) => void,
    onFinishEditing: (item: TaskItemData) => void,
    onRemove: (item: TaskItemData) => void,
    onPressLabel: (data: TaskItemData) => void,
    index: number
}


export const AnimatedTaskItem = (props: TaskItemProps) => {
    const {
        simultaneousHandlers,
        data,
        isEditing,
        onToggleItem,
        onFinishEditing,
        onChangeSubject,
        onPressLabel,
        onRemove,
        index
    } = props;

    const handleToggleCheckBox = useCallback(() => {
        onToggleItem(data)
    }, [data, onToggleItem]);

    const handleChangeSubject = useCallback(subject => {
        onChangeSubject(data, subject)
    }, [data, onChangeSubject])

    const handleFinishEditing = useCallback(() => {
        onFinishEditing(data)
    }, [data, onFinishEditing]);

    const handlePressLabel = useCallback(() => {
        onPressLabel(data)
    }, [data, onPressLabel])

    const handleRemove = useCallback(() => {
        onRemove(data)
    }, [data, onRemove])

    //[{translateX: [-400, {value: 0, delay: 500 * index}]}],


    return (
        <StyledView
            w="full"
            from={{
                opacity: 0,
                transform: [{translateX: -100 * (index+2)}]
            }}
            animate={{
                opacity: 1,
                transform: [{translateX: 0}]
            }}
            exit={{
                opacity: 0,
                transform: [{translateX: -100 * (index+2)}]
            }}
        >

            <TodoItem
                isDone={data.done}
                toggleCheckBox={handleToggleCheckBox}
                isEditing={isEditing}
                subject={data.subject}
                onChangeSubject={handleChangeSubject}
                onPressLabel={handlePressLabel}
                onFinishEditing={handleFinishEditing}
                onRemove={handleRemove}
            />

        </StyledView>
    )
}


const TodoList: React.FC<TaskListProps> = (props) => {

    const {
        data,
        editingItemId,
        onToggleItem,
        onChangeSubject,
        onFinishEditing,
        onPressLabel,
        onRemoveItem
    } = props

    const refScrollView = useRef(null)
    return (<AnimatePresence>
        {data.map((item, key) => (
            <AnimatedTaskItem
                index={key}
                simultaneousHandlers={refScrollView}
                key={item.id}
                data={item}
                isEditing={item.id === editingItemId}
                onToggleItem={onToggleItem}
                onChangeSubject={onChangeSubject}
                onFinishEditing={onFinishEditing}
                onRemove={onRemoveItem}
                onPressLabel={onPressLabel}/>
        ))}
    </AnimatePresence>)


}


export default TodoList;
