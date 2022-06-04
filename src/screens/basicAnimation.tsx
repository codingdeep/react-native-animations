import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Menus from "../components/Menus/menus";

const BasicAnimation: React.FC<{}> = () => {
    return (
        <View style={styles.container}>
            <Menus />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default BasicAnimation
