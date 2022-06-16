import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import {SharedElement} from "react-navigation-shared-element";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RouteProp} from "@react-navigation/native";
import Animated, {
    Extrapolate,
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring, withTiming
} from "react-native-reanimated";
import {ChatRoutes} from "./Models";
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import {snapPoint, useVector} from "react-native-redash";

const {height} = Dimensions.get("window");

interface StoryProps {
    navigation: NativeStackNavigationProp<ChatRoutes, 'chatStory'>;
    route: RouteProp<ChatRoutes, "chatStory">;
}

const ChatStory: React.FC<StoryProps> = ({route, navigation}) => {
    const isGestureActive = useSharedValue(false)
    const {story} = route.params;
    const translation = useVector()
    const translateX: Animated.SharedValue<number> = useSharedValue<number>(0);
    const translateY: Animated.SharedValue<number> = useSharedValue<number>(0);
    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart:()=>{
            isGestureActive.value = true
        },
        onActive: ({translationX, translationY}) => {
            translateX.value = translationX;
            translateY.value = translationY
        },
        onEnd: ({translationY, velocityY}) => {
            const snapBack = snapPoint(translationY, velocityY, [0, height]);
            if (snapBack) {
                runOnJS(navigation.goBack)()
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0)

            }
            isGestureActive.value = false;
        }
    })

    const style = useAnimatedStyle(() => {
        const scale = interpolate(
            translateY.value,
            [0, height],
            [1, 0.5],
            Extrapolate.CLAMP
        );

        return {
            flex: 1,
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value},
                {scale}
            ]
        }
    })

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={style}>
                <SharedElement id={story.id} style={{flex: 1}}>
                    <Animated.Image source={story.source}
                                    style={[
                                        {
                                            ...StyleSheet.absoluteFillObject,
                                            width: undefined,
                                            height: undefined,
                                            resizeMode: "cover",
                                        },
                                        //borderStyle
                                    ]}/>
                </SharedElement>
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default ChatStory
