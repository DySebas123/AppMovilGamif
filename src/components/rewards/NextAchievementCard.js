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

export default function NextAchievementCard({ achievement }) {
    if (!achievement) return null;

    const progress = Math.min(
        (achievement.progress / achievement.goal) * 100,
        100
    );

    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>
                Próximo Logro
            </Text>

            <View style={styles.content}>
                <LinearGradient
                    colors={achievement.badgeBg}
                    style={styles.iconBadge}
                >
                    <Ionicons
                        name={achievement.icon}
                        size={26}
                        color={COLORS.white}
                    />
                </LinearGradient>

                <View style={styles.details}>
                    <Text style={styles.title}>
                        {achievement.title}
                    </Text>

                    <Text style={styles.description}>
                        {achievement.description}
                    </Text>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progress}%` },
                            ]}
                        />
                    </View>

                    <Text style={styles.progressText}>
                        {Math.min(achievement.progress, achievement.goal)} de {achievement.goal}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: 20,
        marginTop: 20,
        ...SHADOWS.small,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 16,
    },

    content: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconBadge: {
        width: 60,
        height: 60,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },

    details: {
        flex: 1,
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },

    description: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
        marginBottom: 10,
    },

    progressBackground: {
        height: 6,
        backgroundColor: "#f1f5f9",
        borderRadius: 3,
        overflow: "hidden",
        marginBottom: 6,
    },

    progressFill: {
        height: "100%",
        backgroundColor: "#0f4c5c",
        borderRadius: 3,
    },

    progressText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: "500",
    },
});