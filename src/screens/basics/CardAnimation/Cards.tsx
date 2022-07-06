import React, {useCallback, useEffect} from 'react'
import Card, {CARD_HEIGHT, CARD_WIDTH} from "./card";
import {Box, VStack} from "native-base";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {Pressable} from "react-native";
const images = [
    'https://images.pexels.com/photos/1382728/pexels-photo-1382728.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfPXtFcDmPDJEpG2unI3l4Rht4Xst0pAMLpQ&usqp=CAU',
    'https://www.whatsappimages.in/wp-content/uploads/2022/04/Best-Quality-Cute-Girl-Pics.jpg'
]
const INITIAL_INDEX: number = -1;

const AnimateBox = Animated.createAnimatedComponent(Box)

const Cards: React.FC<{}> = () => {
    const translateX = useSharedValue(CARD_WIDTH)
    const selectedCard = useSharedValue(INITIAL_INDEX);
    const cardRotation1 = useSharedValue(0)
    const cardRotation2 = useSharedValue(0)
    const cardRotation3 = useSharedValue(0)
    const cardRotations = [cardRotation1, cardRotation2, cardRotation3];
    const translationsY = images.map((_, index) => useSharedValue(0))
    const animation = useSharedValue(0)
    const customTimingMethod = (animation: Animated.SharedValue<number>, value: number) => {
        'worklet'
        animation.value = withTiming(value, {duration: 400, easing: Easing.linear})
    }
    useEffect(() => {
        if (selectedCard.value == INITIAL_INDEX) {
            //customTimingMethod(animation, 1);
            customTimingMethod(cardRotations[0], -15);
            customTimingMethod(cardRotations[2], 15);
        }
    }, []);
    const cardPressed = useCallback((index) => {
        customTimingMethod(animation, 1);
        customTimingMethod(selectedCard, 1);
        customTimingMethod(cardRotations[0], -25);
        customTimingMethod(cardRotations[1], 25);
        customTimingMethod(cardRotations[2], 0);
        cardRotations.filter((_, i) => i != index).map((item, index) => {
            index == 0 ? item.value = withTiming(-25, {duration: 4000}) : item.value = withTiming(25, {duration: 4000})
        })
        customTimingMethod(cardRotations[index], 0);

        customTimingMethod(translateX, 0);
        translationsY.filter((_, i) => i != index).map((item, index) => {
            item.value = withTiming(0, {duration: 0})
        })
        customTimingMethod(translationsY[index], 1)
    }, [])

    return (<VStack alignItems="center" flex={1} justifyContent="center">
            {images.map((item, index) => {
                const initialRotation = useAnimatedStyle(() => {
                    return {
                        transform: [
                            {translateX: -translateX.value},
                            {rotateZ: cardRotations[index].value + "deg"},
                            {translateX: translateX.value},
                            {
                               translateY: interpolate(translationsY[index].value,[0, 0.5, 1],[0, -CARD_HEIGHT * 1.5, 0] )
                            },
                            {
                              rotateZ:interpolate(translationsY[index].value,[0, 0.5, 1],[0, 45, 0]) + 'deg'
                            }
                        ],
                        zIndex: interpolate(translationsY[index].value,[0, 0.5],[0, 1])
                    }
                })
                return (
                    <AnimateBox
                        style={[initialRotation]}
                        width={CARD_WIDTH}
                        height={CARD_HEIGHT}
                        borderRadius={10}
                        overflow="hidden"
                        position="absolute">
                        <Pressable onPress={() => cardPressed(index)} style={{flex: 1}}>
                            <Card item={item}/>
                        </Pressable>
                    </AnimateBox>)
            })}
        </VStack>
    )
}

export default Cards
