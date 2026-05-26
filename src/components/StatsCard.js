import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../styles/colors";
import SHADOWS from "../styles/shadows";

export default function StatsCard({
    icon,
    iconColor,
    backgroundColor,
    title,
    value,
}) {

    return (
        <View style={styles.card}>

            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor }
                ]}
            >
                <Ionicons
                    name={icon}
                    size={22}
                    color={iconColor}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.value}>
                    {value}
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,

        width: '48%',

        padding: 16,

        borderRadius: 18,

        flexDirection: 'row',
        alignItems: 'center',

        ...SHADOWS.small,
    },

    iconContainer: {
        width: 46,
        height: 46,

        borderRadius: 14,

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: 12,
    },

    textContainer: {
        flex: 1,
    },

    title: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },

    value: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.textPrimary,
    },
});