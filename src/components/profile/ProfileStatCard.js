import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";

export default function ProfileStatCard({
    icon,
    iconColor,
    backgroundColor,
    value,
    label,
}) {
    return (
        <View style={styles.card}>
            <View
                style={[
                    styles.iconCircle,
                    { backgroundColor },
                ]}
            >
                <Ionicons
                    name={icon}
                    size={20}
                    color={iconColor}
                />
            </View>

            <Text style={styles.number}>
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
        backgroundColor: COLORS.white,
        flex: 1,
        paddingVertical: 12,
        borderRadius: 18,
        alignItems: "center",
        ...SHADOWS.medium,
    },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    number: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.textPrimary,
    },

    label: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
});