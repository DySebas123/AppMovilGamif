import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";

export default function StatsSummaryCard({
    label,
    value,
    icon,
    colors,
}) {
    return (
        <View style={styles.card}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBox}
            >
                <Ionicons
                    name={icon}
                    size={24}
                    color={COLORS.white}
                />
            </LinearGradient>

            <Text style={styles.value}>
                {value}
            </Text>

            <Text style={styles.label}>
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "48%",
        backgroundColor: COLORS.white,
        borderRadius: 22,
        padding: 18,
        ...SHADOWS.small,
    },

    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    value: {
        fontSize: 25,
        fontWeight: "800",
        color: COLORS.textPrimary,
        marginBottom: 2,
    },

    label: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
});