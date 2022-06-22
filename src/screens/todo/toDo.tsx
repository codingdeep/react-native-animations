import React from "react";
import {View, Text, StyleSheet} from "react-native";
import MainScreen from "./main";

const Todo: React.FC<{}> = () => {
    return (
        <MainScreen></MainScreen>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Todo
