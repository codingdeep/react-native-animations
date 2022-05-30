import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Card from '../components/Card';
import Products from '../components/Products';
import {products} from '../Model';
import {CARD_HEIGHT} from '../components/Card';
import Cards from '../components/Cards';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import {Product} from '../Model';
import {useNavigation} from '@react-navigation/native';


const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  slider: {height: CARD_HEIGHT},
});
const snapToOffsets = [0, CARD_HEIGHT];
const Phizcoffee = () => {
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x}}) => {
      translateX.value = x;
    },
  });

  const style = useAnimatedStyle(() => ({
    flex: 1,
    backgroundColor: interpolateColor(
      translateX.value,
      products.map((_: any, i: number) => width * i),
      products.map((product: Product) => product.color2),
    ),
  }));


  return (
    <>
      <Animated.View style={style}>
        <ScrollView
          decelerationRate="fast"
          snapToOffsets={snapToOffsets}
          bounces={false}
          showsVerticalScrollIndicator={false}
          snapToEnd={false}>
          <View style={styles.slider}>
            <Animated.ScrollView
              onScroll={onScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={width}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {products.map((product: Product, index: number) => (
                <Card key={index} product={product} />
              ))}
            </Animated.ScrollView>
            <Products x={translateX} />
          </View>
          <Cards />
        </ScrollView>
      </Animated.View>
      <View>
        <TouchableOpacity style={{width:100,height: 40}} onPress={() => navigation.navigate('Parallax')}>
          <Text>Parallax</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Phizcoffee;
