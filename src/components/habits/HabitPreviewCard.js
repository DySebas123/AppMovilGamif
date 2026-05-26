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

export default function HabitPreviewCard({
    title,
    frequency,
    icon,
    label = "Nuevo hábito",
}) {
    return (
        <LinearGradient
            colors={COLORS.gradientDark}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.previewCard}
        >
            <View style={styles.previewIcon}>
                <Ionicons
                    name={icon || "checkmark-circle-outline"}
                    size={30}
                    color={COLORS.white}
                />
            </View>

            <View style={styles.previewInfo}>
                <Text style={styles.previewLabel}>
                    {label}
                </Text>

                <Text style={styles.previewTitle}>
                    {title || "Nombre del hábito"}
                </Text>

                <Text style={styles.previewSubtitle}>
                    Frecuencia: {frequency}
                </Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    previewCard: {
        borderRadius: 26,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        ...SHADOWS.medium,
    },

    previewIcon: {
        width: 62,
        height: 62,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.18)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    previewInfo: {
        flex: 1,
    },

    previewLabel: {
        color: "rgba(255,255,255,0.75)",
        fontSize: 12,
        fontWeight: "700",
        textTransform: "uppercase",
        marginBottom: 4,
    },

    previewTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "800",
    },

    previewSubtitle: {
        color: "rgba(255,255,255,0.85)",
        fontSize: 13,
        marginTop: 4,
    },
});