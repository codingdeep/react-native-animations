import * as React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    FlatList,
    Text,
    View,
    StyleSheet,
    StatusBar, TouchableOpacity,
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParams} from "../../App";

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.80;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const images = [
    'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
    'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
    'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
    'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
    'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
    'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
    'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
    'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
    'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
    'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];
const data = images.map((image, index) => ({
    key: String(index),
    photo: image,
    avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
        Math.random() * 40,
    )}.jpg`,
}));

export default function Parallax() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const scrollx = React.useRef(new Animated.Value(0)).current
    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <Animated.FlatList
                onScroll={Animated.event(
                    [{nativeEvent:{contentOffset:{x:scrollx}}}],
                    {useNativeDriver: true}
                )}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                keyExtractor={item => item.key}
                data={data}
                renderItem={({item, index}) => {
                    const inputRange = [(index - 1) * width, index * width, (index+1) * width]
                    const translateX = scrollx.interpolate({
                        inputRange,
                        outputRange:[-width * .7,0,width * .7]
                    })
                    return (
                        <View
                            style={{width, justifyContent: 'center', alignItems: 'center'}}>
                            <View
                                style={{
                                    borderRadius: 20,
                                    borderWidth: 10,
                                    borderColor: '#fff',
                                    shadowColor: '#000',
                                    shadowRadius: 20,
                                    shadowOffset: {
                                        width: 0,
                                        height: 0,
                                    },
                                    shadowOpacity: .5,
                                }}>
                                <View
                                    style={{
                                        width: ITEM_WIDTH,
                                        overflow: 'hidden',
                                        height: ITEM_HEIGHT,
                                    }}>
                                    <Animated.Image
                                        style={{
                                            width: ITEM_WIDTH,
                                            height: ITEM_HEIGHT,
                                            transform:[
                                                {translateX}
                                            ]
                                    }}
                                        source={{uri: item.photo}}
                                    />
                                </View>
                                <Animated.Image
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 60,
                                        position:'absolute',
                                        bottom: -30,
                                        zIndex: 1,
                                        right: 60
                                    }}
                                    source={{uri: item.avatar_url}}
                                />
                            </View>

                        </View>
                    );
                }}
            />
            <View>
                <TouchableOpacity style={{width:100,height: 40}} onPress={() => navigation.navigate('FlingGesture')}>
                    <Text>Fling Gesture</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
