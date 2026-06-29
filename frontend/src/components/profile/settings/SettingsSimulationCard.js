import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SettingsSimulationCard({
    theme,
    currentDate,
    demoDayOffset,
    onSimulateNextDay,
}) {
    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.surface },
            ]}
        >
            <Text
                style={[
                    styles.demoDate,
                    { color: theme.textPrimary },
                ]}
            >
                Fecha actual: {currentDate}
            </Text>

            <Text
                style={[
                    styles.demoSubtext,
                    { color: theme.textSecondary },
                ]}
            >
                Días simulados: {demoDayOffset}
            </Text>

            <TouchableOpacity
                style={styles.demoButton}
                activeOpacity={0.8}
                onPress={onSimulateNextDay}
            >
                <Ionicons
                    name="play-forward-outline"
                    size={18}
                    color="#ffffff"
                />

                <Text style={styles.demoButtonText}>
                    Simular siguiente día
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        borderRadius: 22,
        padding: 18,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },

    demoDate: {
        fontSize: 16,
        fontWeight: "700",
    },

    demoSubtext: {
        fontSize: 13,
        marginTop: 4,
        marginBottom: 16,
    },

    demoButton: {
        backgroundColor: "#0f766e",
        paddingVertical: 14,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    demoButtonText: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 14,
    },
});