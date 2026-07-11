import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

function ProfileStatCard({
    icon,
    iconColor,
    iconBackground,
    value,
    label,
    theme,
}) {
    return (
        <View
            style={[
                styles.statCard,
                { backgroundColor: theme.surface },
            ]}
        >
            <View
                style={[
                    styles.statIconCircle,
                    { backgroundColor: iconBackground },
                ]}
            >
                <Ionicons
                    name={icon}
                    size={20}
                    color={iconColor}
                />
            </View>

            <Text
                style={[
                    styles.statNumber,
                    { color: theme.textPrimary },
                ]}
            >
                {value}
            </Text>

            <Text
                style={[
                    styles.statLabel,
                    { color: theme.textSecondary },
                ]}
            >
                {label}
            </Text>
        </View>
    );
}

export default function ProfileStatsGrid({
    xp,
    completedHabits,
    level,
    bestStreak,
    totalHabits,
    theme,
}) {
    return (
        <>
            <View style={styles.statsRow}>
                <ProfileStatCard
                    icon="trophy-outline"
                    iconColor="#3b82f6"
                    iconBackground="#eff6ff"
                    value={xp}
                    label="XP Total"
                    theme={theme}
                />

                <ProfileStatCard
                    icon="checkmark-circle-outline"
                    iconColor="#22c55e"
                    iconBackground="#f0fdf4"
                    value={completedHabits}
                    label="Completados"
                    theme={theme}
                />

                <ProfileStatCard
                    icon="star-outline"
                    iconColor="#a855f7"
                    iconBackground="#faf5ff"
                    value={level}
                    label="Nivel"
                    theme={theme}
                />
            </View>

            <View style={styles.statsRow}>
                <ProfileStatCard
                    icon="flame-outline"
                    iconColor="#f97316"
                    iconBackground="#fff7ed"
                    value={bestStreak}
                    label="Mejor Racha"
                    theme={theme}
                />

                <ProfileStatCard
                    icon="list-outline"
                    iconColor="#06b6d4"
                    iconBackground="#ecfeff"
                    value={totalHabits}
                    label="Hábitos"
                    theme={theme}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    statsRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        gap: 10,
    },

    statCard: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 18,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },

    statIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    statNumber: {
        fontSize: 18,
        fontWeight: "bold",
    },

    statLabel: {
        width: "100%",
        textAlign: "center",
        marginTop: 3,
        fontSize: 12,
    },
});