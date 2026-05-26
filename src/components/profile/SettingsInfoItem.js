import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../styles/colors";

export default function SettingsInfoItem({
    icon,
    title,
    description,
}) {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
                <Ionicons
                    name={icon}
                    size={22}
                    color="#0f766e"
                />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.infoTitle}>
                    {title}
                </Text>

                <Text style={styles.infoDescription}>
                    {description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    infoIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#ecfdf5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    infoTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 4,
    },

    infoDescription: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
});