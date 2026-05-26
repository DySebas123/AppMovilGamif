import React from "react";

import {
    View,
    StyleSheet,
} from "react-native";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";

export default function Card({ children, style }) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 26,
        padding: 20,
        ...SHADOWS.small,
    },
});