import React from 'react';
import {Image, View, Dimensions, StyleSheet} from 'react-native';
import {products} from '../Model';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {transform} from "@babel/core";

const {width} = Dimensions.get('window');
const SIZE = 200;
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

interface ProductsProps {
    x: Animated.SharedValue<number>;
}

const Products = ({x}: ProductsProps) => {
    return (
        <View style={[styles.container]} pointerEvents="none">
            {products.map((product, index) => {
                const style = useAnimatedStyle(() => {
                    const inputRange = [
                        width * (index - 1),
                        width * index,
                        width * (index + 1)
                    ];
                    const translateX = interpolate(
                        x.value,
                        inputRange,
                        [width/2,0,-width/2]
                    );
                  const scale = interpolate(
                      x.value,
                      [(index - 1) * width, index * width, (index + 1) * width],
                      [0.61, 1, 0.61]
                  );
                  return {
                    transform: [{ translateX },{scale}],
                  };
                })
                return (
                    <Animated.View style={[styles.container, style]}>
                        <Image
                            style={{width: SIZE, height: SIZE * product.aspectRatio,}}
                            source={product.picture}
                        />
                    </Animated.View>
                );
            })}
        </View>
    );
};
export default Products;
