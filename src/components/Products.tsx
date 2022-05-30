import React from 'react';
import {Image, View, Dimensions, StyleSheet} from 'react-native';
import {products} from '../Model';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
const {width} = Dimensions.get('window');
const SIZE = 200;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ProductProps {
  x: Animated.SharedValue<number>;
}

const Products = ({x}: ProductProps) => {
  return (
    <View style={[styles.container]} pointerEvents="none">
      {products.map(product => {

        return (
          <View style={styles.container}>
            <Image
              style={{width: SIZE, height: SIZE * product.aspectRatio}}
              source={product.picture}
            />
          </View>
        );
      })}
    </View>
  );
};
export default Products;
