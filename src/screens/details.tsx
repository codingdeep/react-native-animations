import React from 'react';
import {View,Text} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParams} from "../../App";
type Props = NativeStackScreenProps<StackParams,"Phizcoffee">
const Details:React.FC<Props> = ({route}:Props) => {
    return (
        <View>
          <Text>Name: {route?.params?.name}</Text>
        </View>
    );
};

export default Details;
