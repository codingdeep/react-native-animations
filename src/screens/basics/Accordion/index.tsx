import React, { useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Animated, {
    useSharedValue,
    useDerivedValue,
    useAnimatedStyle,
    useAnimatedRef,
    measure,
    runOnUI,
    withTiming,
    Extrapolate, interpolate,
} from 'react-native-reanimated';
import { Icon } from 'native-base';


const Accordions = () => {
    const aref = useAnimatedRef();
    const open = useSharedValue(false);
    const animatedVar = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)), [open]);
    const height = useSharedValue(0);

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${animatedVar.value * 180}deg` }],
    }), [animatedVar]);

    const accordStyle = useAnimatedStyle(() => ({
        height: interpolate(animatedVar.value, [0, 1], [0, height.value], Extrapolate.CLAMP),
        opacity: animatedVar.value,
    }), [animatedVar, height]);

    const pressAccord = useCallback(async () => {

        if (height.value === 0) {
            console.log(aref)
            console.log('===================== sadfdad',measure(aref))
            runOnUI(() => {
                'worklet';
                height.value = measure(aref).height;
            })();
        }
        open.value = !open.value;
    }, [aref, height, open]);

    return (
        <>
            <TouchableOpacity onPress={() => pressAccord()}>
                <View style={styles.titleContainer}>
                    <Text>Hello Title</Text>
                    <Animated.View style={iconStyle}>
                        <Icon name="chevron-down-outline" size={20} />
                    </Animated.View>
                </View>
            </TouchableOpacity>
            <Animated.View style={[styles.bodyBackground, accordStyle]}>
                <View
                    ref={aref}
                    style={[
                        styles.bodyContainerAbs,
                        styles.bodyContainerCenter,

                    ]}
                >
                    <Text>Hello Children</Text>
                </View>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    bodyBackground: {
        backgroundColor: '#EFEFEF',
        overflow: 'hidden',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EFEFEF',
    },
    bodyContainerCenter: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    bodyContainerAbs: {
        padding: 5,
        paddingLeft: 10,
        position: 'absolute',
        bottom: 0,
    },
});

export default Accordions;
