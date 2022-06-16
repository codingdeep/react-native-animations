import React from "react";
import {Animated, Dimensions, StyleSheet, View} from "react-native";
import Card, {
    Cards,
    CARD_HEIGHT as DEFAULT_CARD_HEIGHT,
} from "./Card";

export const MARGIN = 16;
export const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;
const {height: wHeight} = Dimensions.get("window");
const height = wHeight - 64;
const styles = StyleSheet.create({
    card: {
        marginVertical: MARGIN,
        alignSelf: "center",
    },
});

interface WalletCardProps {
    y: Animated.Value;
    index: number;
    type: Cards;
}

const WalletCard = ({type, y, index}: WalletCardProps) => {

    const translateY = y

    return (
        <Animated.View
            style={[styles.card, {transform: [{translateY}]}]}
            key={index}
        >
            <Card {...{type}} />
        </Animated.View>
    );
};

export default WalletCard;
