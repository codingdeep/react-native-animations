import React from "react";
import {View, Text, StyleSheet} from "react-native";
interface BoxProps{
    children:React.ReactNode
}
const Box: React.FC<BoxProps> = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default Box
