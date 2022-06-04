import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ViewStyle, SafeAreaView, StyleSheet, Dimensions, Image, Animated} from "react-native";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import data, {detailList, iconsByType, IconsType} from "../components/data";
import {Directions, FlingGestureHandler, GestureHandlerRootView, State} from "react-native-gesture-handler";
import {Easing, Transition, Transitioning, TransitioningView} from "react-native-reanimated";

const {width, height} = Dimensions.get('window')
const DURATION = 700;
const TITLE_SIZE = 36;
const SPACING = 80;
const IMAGE_SIZE = width * 0.8


interface ItemProps {
    styles: ViewStyle
    children: React.ReactNode,
}


const Item = ({children, styles}: ItemProps) => {
    return (
        <View style={[styles, {overflow: 'hidden', backgroundColor: 'transparent'}]}>
            {children}
        </View>
    )
}

const textColors = {
    light: '#fff',
    dark: '#000'
}
const Title = ({index, text, color}: { index: number, text: string, color: string }) => {
    return <Item styles={{height: 100}}>
        <Text key={`title-${index}`} style={{color, fontSize: 30}}>{text}</Text>
    </Item>
}
const Icon = ({type}: { type: string }) => {
    return (
        <SimpleLineIcons
            name={type}
            size={26}
            color="#A5A6AA"
            style={{marginRight: 15, height: 26, marginBottom: 5}}
        />
    )
}

type DetailsProps = {
    color: string,
    index: number
}

const Details = ({color, index}: DetailsProps) => {

    return (
        <View style={{marginTop: -70}}>
            {detailList.map((key) => {
                return (
                    <View key={key} style={{flexDirection: 'row'}}>
                        <Icon type={iconsByType[key]}/>
                        <Item styles={{flex: 1, height: 26, justifyContent: 'center'}}>
                            <Text
                                style={{fontSize: 13, color, fontWeight: '700'}}
                                key={`${key}-${index}`}>{data[index][key]}</Text>
                        </Item>
                    </View>
                )
            })}
        </View>
    )
}

interface DescriptionProps {
    index: number,
    text: string,
    color: string
}

const Description: React.FC<DescriptionProps> = ({index, text, color}) => {
    return (
        <Item styles={{marginBottom: 50, paddingHorizontal: 10}}>
            <Text
                style={{fontSize: 16, color}}
                key={`description-${index}`}>
                {text}
            </Text>
        </Item>
    )
}
const transition = (
    <Transition.Together>
        <Transition.Out type="slide-bottom" />
        <Transition.In type="slide-bottom" />
    </Transition.Together>
)
function FlingGesture() {

    const [index, setIndex] = useState(0);
    const textColor = index % 2 === 0 ? textColors.dark : textColors.light;
    const animation = React.useRef(new Animated.Value(0)).current;
    const activeIndex = React.useRef(new Animated.Value(0)).current
    const ref = React.useRef()
    const ref1 = React.useRef()
    useEffect(() => {
        Animated.timing(animation, {
            toValue: activeIndex,
            duration: DURATION,
            useNativeDriver: true
        }).start()
    }, [])

    const setActiveIndex = useCallback((newIndex) => {
        activeIndex.setValue(newIndex);
        setIndex(newIndex)
        ref?.current?.animateNextTransition()
        ref1?.current?.animateNextTransition()
    }, []);

    const translateY = animation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [height, 0, -height]
    })


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <FlingGestureHandler
                key="up"
                direction={Directions.UP}
                onHandlerStateChange={(ev) => {
                    if (ev.nativeEvent.state === State.END) {
                        if (index == data.length - 1) {
                            return
                        }
                        setActiveIndex(index + 1)
                    }
                }}
            >
                <FlingGestureHandler
                    key="down"
                    direction={Directions.DOWN}
                    onHandlerStateChange={(ev) => {
                        if (ev.nativeEvent.state === State.END) {
                            if (index == 0) {
                                return
                            }
                            setActiveIndex(index - 1)
                        }
                    }}
                >
                    <SafeAreaView style={style.container}>


                        <Animated.View style={{
                            ...StyleSheet.absoluteFillObject,
                            height: data.length * height,
                            transform: [{translateY}]
                        }}>
                            {data.map((_, key) => (
                                <View style={{
                                    height: height,
                                    backgroundColor: key % 2 === 0 ? textColors.light : textColors.dark}}></View>
                            ))}
                        </Animated.View>
                        <Transitioning.View
                            ref={ref}
                            transition={transition}>
                            <Title index={index} text={data[index].title} color={textColor}/>
                        </Transitioning.View>
                        <Transitioning.View ref={ref1} transition={transition}>
                            <Details color={textColor} index={index}/>
                        </Transitioning.View>
                        <View style={{
                            width: 200,
                            height: 200,
                            borderRadius: 100,
                            overflow: 'hidden',
                            backgroundColor: 'red',
                            position: 'absolute',
                            top: '50%',
                            marginTop: -100,
                            right: -20
                        }}>
                            <Image style={{flex: 1, resizeMode: 'cover'}} source={{uri: data[index].image}}/>
                        </View>
                        <Description index={index} text={data[index].description} color={textColor}/>
                    </SafeAreaView>
                </FlingGestureHandler>
            </FlingGestureHandler>
        </GestureHandlerRootView>);
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between'
    }
})
export default FlingGesture;
