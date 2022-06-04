import React from "react";
import {View, Text, StyleSheet,TouchableOpacity} from "react-native";
import {MenuItem, MenuItems} from "./menuItems";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParams} from "../../../App";
const Menus: React.FC<{}> = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams, "BasicAnimatedScreen">>();
    return (
        <View>
            {MenuItems.map((item:MenuItem)=>(
                <TouchableOpacity onPress={()=>navigation.navigate(item.name)}><Text style={{fontSize: 20,color: 'blue',fontWeight:'700'}}>{item.label}</Text></TouchableOpacity>
            ))}
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
export default Menus
