import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Story} from "./Models";
import StoryThumbnail from "./storyThumbnail";

export const stories: Story[] = [
    {
        id: "2",
        source: require("../../../assets/stories/2.jpg"),
        user: "derek.russel",
        avatar: require("../../../assets/avatars/derek.russel.png"),
    },
    {
        id: "4",
        source: require("../../../assets/stories/4.jpg"),
        user: "jmitch",
        avatar: require("../../../assets/avatars/jmitch.png"),
    },
    {
        id: "7",
        source: require("../../../assets/stories/7.jpg"),
        user: "andrea.schmidt",
        avatar: require("../../../assets/avatars/andrea.schmidt.png"),
        video: require("../../../assets/stories/7.mp4"),
    },
    {
        id: "5",
        source: require("../../../assets/stories/5.jpg"),
        user: "monicaa",
        avatar: require("../../../assets/avatars/monicaa.png"),
    },
    {
        id: "3",
        source: require("../../../assets/stories/3.jpg"),
        user: "alexandergarcia",
        avatar: require("../../../assets/avatars/alexandergarcia.png"),
    },
    {
        id: "1",
        source: require("../../../assets/stories/1.jpg"),
        user: "andrea.schmidt",
        avatar: require("../../../assets/avatars/andrea.schmidt.png"),
    },
    {
        id: "6",
        source: require("../../../assets/stories/6.jpg"),
        user: "andrea.schmidt",
        avatar: require("../../../assets/avatars/andrea.schmidt.png"),
    },
];


const SnapChat: React.FC<{}> = () => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.container}>
                {stories.map((story:Story)=>(
                    <StoryThumbnail key={story.id} story={story} />
                ))}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    }
})
export default SnapChat
