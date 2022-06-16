import React from "react";
import {View, Text, StyleSheet, Pressable, Image,Dimensions} from "react-native";
import {SnapchatRoutes, Story} from './Models'
import { SharedElement } from "react-navigation-shared-element";
import {useNavigation} from "@react-navigation/native";
import {SharedElementCompatRoute} from "react-navigation-shared-element";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParams} from "../../../../App";
export interface ThumbnailProps{
    story:Story
}
const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;


const StoryThumbnail: React.FC<ThumbnailProps> = ({story}) => {
    const [opacity, setOpacity] = React.useState(1);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <Pressable
            onPress={()=>{
                navigation.navigate("story",{story})
            }}
            style={({pressed})=>({opacity: pressed ? 0.5 : 1})}
        >
            <SharedElement id={story.id}>
                <View style={[styles.container,{opacity}]}>
                    <Image source={story.source} style={styles.image} />
                </View>
            </SharedElement>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width,
        height: width * 1.77,
        marginTop: 16,
        borderRadius
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
        resizeMode: "cover",
        borderRadius,
    }
})
export default StoryThumbnail
