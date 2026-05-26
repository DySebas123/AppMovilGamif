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

export default function WeeklyActivityChart({
    data,
    level,
}) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>
                        Actividad Semanal
                    </Text>

                    <Text style={styles.subtitle}>
                        Progreso de los últimos 7 días
                    </Text>
                </View>

                <View style={styles.levelBadge}>
                    <Ionicons
                        name="star"
                        size={14}
                        color="#facc15"
                    />

                    <Text style={styles.levelText}>
                        Nivel {level}
                    </Text>
                </View>
            </View>

            <View style={styles.chartContainer}>
                {data.map((item) => {
                    const percentage = (item.completed / item.total) * 100;

                    return (
                        <View
                            key={item.date}
                            style={styles.chartItem}
                        >
                            <View style={styles.barBackground}>
                                <LinearGradient
                                    colors={COLORS.gradientPrimary}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    style={[
                                        styles.barFill,
                                        { height: `${percentage}%` },
                                    ]}
                                />
                            </View>

                            <Text style={styles.dayText}>
                                {item.day}
                            </Text>

                            <Text style={styles.dayValue}>
                                {item.completed}/{item.total}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 28,
        padding: 20,
        marginBottom: 20,
        ...SHADOWS.medium,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22,
    },

    title: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.textPrimary,
    },

    subtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 4,
    },

    levelBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0f172a",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
    },

    levelText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 4,
    },

    chartContainer: {
        height: 190,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 8,
    },

    chartItem: {
        flex: 1,
        alignItems: "center",
    },

    barBackground: {
        width: "100%",
        height: 135,
        backgroundColor: "#f1f5f9",
        borderRadius: 14,
        overflow: "hidden",
        justifyContent: "flex-end",
        marginBottom: 8,
    },

    barFill: {
        width: "100%",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },

    dayText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#475569",
    },

    dayValue: {
        fontSize: 11,
        color: "#94a3b8",
        marginTop: 2,
    },
});