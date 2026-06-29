import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SettingsResetCard({
    theme,
    onReset,
}) {
    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.surface },
            ]}
        >
            <TouchableOpacity
                style={styles.resetButton}
                activeOpacity={0.8}
                onPress={onReset}
            >
                <Ionicons
                    name="refresh-outline"
                    size={20}
                    color="#ef4444"
                />

                <Text style={styles.resetText}>
                    Reiniciar progreso
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

    resetButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    resetText: {
        color: "#ef4444",
        fontWeight: "700",
        fontSize: 15,
    },
});