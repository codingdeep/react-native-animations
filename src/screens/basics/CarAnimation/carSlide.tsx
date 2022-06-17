import React from "react";
import {View, Text, StyleSheet, Dimensions, Image} from "react-native";
const {width} = Dimensions.get('window')

interface CarProps {
    carname: string,
    image: number
}

const CarSlide: React.FC<CarProps> = ({carname, image}) => {
    let src = {}
    switch (image) {
        case 1:
            src = {source: require(`../../../assets/cars/1.png`)}
            break;
        case 2:
            src = {source: require(`../../../assets/cars/2.png`)}
        case 3:
            src = {source: require(`../../../assets/cars/3.png`)}
            break;
        case 4:
            src = {source: require(`../../../assets/cars/4.png`)}
            break;
        case 5:
            src = {source: require(`../../../assets/cars/5.png`)}
            break;
    }

    return (
        <View style={styles.container}>
            <Image resizeMode="contain" style={styles.image} {...src} />
            <Text style={{paddingBottom: 20}}>{carname}</Text>
        </View>
    )
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width
    },
    image: {
        flex: 1,
        alignSelf: 'center',
        aspectRatio: 1.2
    }
})
export default CarSlide
