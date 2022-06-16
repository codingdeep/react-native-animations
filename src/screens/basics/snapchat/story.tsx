import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import Video from "react-native-video"
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SnapchatRoutes} from "./Models";
import {RouteProp} from "@react-navigation/native";
import {SharedElement} from "react-navigation-shared-element";
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";

import {snapPoint} from "react-native-redash";

const {height} = Dimensions.get("window");
const AnimatedVideo = Animated.createAnimatedComponent(Video);

interface StoryProps {
    navigation: NativeStackNavigationProp<SnapchatRoutes, "story">;
    route: RouteProp<SnapchatRoutes, "story">;
}

const Story: React.FC<StoryProps> = ({route, navigation}) => {
    const {story} = route.params;
    const translateX: Animated.SharedValue<number> = useSharedValue<number>(0)
    const translateY: Animated.SharedValue<number> = useSharedValue<number>(0)

    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: ({translationX, translationY}) => {
            translateX.value = translationX, translateY.value = translationY
        },
        onEnd: ({translationY, velocityY}) => {
            const goBack = snapPoint(translationY, velocityY, [0, height]) === height;
            if (goBack) {
                runOnJS(navigation.goBack)()
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0)
            }
        }
    });

    const style = useAnimatedStyle(() => {
        return {
            flex: 1,
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value}
            ]
        }
    })
    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={style}>
                <SharedElement id={story.id} style={{flex: 1}}>
                    <>
                        {!story.video &&
                            <Animated.Image
                                source={story.source}
                                style={[
                                    {
                                        ...StyleSheet.absoluteFillObject,
                                        width: undefined,
                                        height: undefined,
                                        resizeMode: "cover",
                                    }
                                ]}
                            />
                        }
                        {story.video && (
                            <AnimatedVideo
                                source={story.video}
                                rate={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={[StyleSheet.absoluteFill]}
                            />
                        )}
                    </>
                </SharedElement>
            </Animated.View>
        </PanGestureHandler>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Story
