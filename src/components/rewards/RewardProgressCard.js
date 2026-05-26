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

export default function RewardProgressCard({
    progressPercentage,
}) {
    return (
        <LinearGradient
            colors={["#0f4c5c", "#0096c7", "#2a9d8f"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <View style={styles.row}>
                <View>
                    <Text style={styles.label}>
                        Progreso de Logros
                    </Text>

                    <Text style={styles.percentage}>
                        {progressPercentage}%
                    </Text>
                </View>

                <View style={styles.iconCircle}>
                    <Ionicons
                        name="trophy-outline"
                        size={30}
                        color="#eab308"
                    />
                </View>
            </View>

            <View style={styles.barBackground}>
                <View
                    style={[
                        styles.barFill,
                        { width: `${progressPercentage}%` },
                    ]}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 8,
        borderRadius: 24,
        padding: 24,
        marginBottom: 25,
        ...SHADOWS.medium,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    label: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    percentage: {
        color: COLORS.white,
        fontSize: 36,
        fontWeight: "800",
        marginTop: 4,
    },

    iconCircle: {
        width: 55,
        height: 55,
        borderRadius: 28,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
    },

    barBackground: {
        height: 8,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 4,
        overflow: "hidden",
    },

    barFill: {
        height: "100%",
        backgroundColor: "#facc15",
        borderRadius: 4,
    },
});