import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Button from './Button';
import CardHeader from './CardHeader';
const {width} = Dimensions.get('window');
import {Product} from '../Model';

export const CARD_HEIGHT = (width * 1564) / 974;
const styles = StyleSheet.create({
  container: {
    width,
    height: CARD_HEIGHT,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#432406',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#432406',
  },
});

interface CardProps {
  product: Product;
}
function Card({product: {color1, title, subtitle}}: CardProps) {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 16,
          margin: 32,
          flex: 1,
          backgroundColor: color1,
          padding: 16,
          justifyContent: 'space-between',
        }}>
        <View>
          <CardHeader />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Button label="I'll try it" />
      </View>
    </View>
  );
}

export default Card;
