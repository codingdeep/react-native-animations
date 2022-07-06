import React from 'react'
import {Dimensions, Image,} from "react-native";
import {VStack, Text, Box} from "native-base";

interface Props {
    item: string
}

const {width} = Dimensions.get('window');
export const CARD_WIDTH = width * .8;
export const CARD_HEIGHT = width * .50


const Card: React.FC<Props> = ({item}) => {
    return (<>
        <Image style={{flex: 1, width: null, height: null}}
               source={{uri: item}}/>
        <Box position="absolute" bottom={0} p={5} bg="orange.900" w="100%">
            <Text color="#fff">My salon h2o</Text>
        </Box></>)
}

export default Card
