import React, {useState} from 'react';
import {View, Text, ViewStyle, SafeAreaView, StyleSheet} from "react-native";
interface ItemProps{
    styles:ViewStyle
    children: React.ReactNode,
}
const Item=({children,styles}:ItemProps)=>{
    return(
        <View style={[styles,{overflow:'hidden',backgroundColor:'transparent'}]}>
            {children}
        </View>
    )
}
const Title=({index,text,color}:{index:number,text:string,color:string})=>{
    return <Item styles={{height: 100}}>
        <Text key={`title-${index}`} style={{color}}>{text}</Text>
    </Item>
}

function FlingGesture() {

    const [index,setIndex] = useState(0);

    return (<SafeAreaView style={style.container}>
            <Text>Hello</Text>
        </SafeAreaView>);
}
const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'red'
    }
})
export default FlingGesture;
