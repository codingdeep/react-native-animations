import React from "react";
import {View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions} from "react-native";
import {ChatRoutes, Story} from "./Models";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SharedElement} from "react-navigation-shared-element";
export interface ThumbNailProps{
    story:Story
}

const margin = 16;
const borderRadius= 10
const width = Dimensions.get("window").width / 2 - margin * 2;
const height = Dimensions.get("window").width * 1.77
const StoryThumbnail: React.FC<ThumbNailProps> = ({story}) => {
    const navigation = useNavigation<NativeStackNavigationProp<ChatRoutes>>();
    return (
        <Pressable
            style={({pressed})=>({opacity: pressed ? 0.5 : 1})}
            onPress={()=>navigation.navigate('chatStory',{story})}
        >
            <SharedElement id={story.id} >
                <View style={styles.container}>
                    <Image source={story.source} style={styles.image} />
                </View>
            </SharedElement>

        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height:width * 1.77,
        marginTop:margin,
        borderRadius,
        overflow:'hidden'
    },
    image:{
        width: undefined,
        height: undefined,
        resizeMode:'cover',
        ...StyleSheet.absoluteFillObject,
    }
})
export default StoryThumbnail
