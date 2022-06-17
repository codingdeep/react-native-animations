import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {styles as style} from "./carSlide";

const Logo: React.FC<{}> = () => {
    return (
        <View style={{width: 100,height: 100}}>
            <Image resizeMode="contain" style={{...style.image,width: 100, height: 60,flex: 1}} source={{uri:'https://silverbird.s3.amazonaws.com/345678901/images/meta/logo/elbb-fscale.png'}} />
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
export default Logo
