import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SettingsHeader({ onBack }) {
    return (
        <LinearGradient
            colors={["#0f766e", "#10b981"]}
            style={styles.header}
        >
            <View style={styles.headerTopRow}>
                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPress={onBack}
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color="#ffffff"
                    />
                </TouchableOpacity>

                <View style={styles.settingsIconContainer}>
                    <Ionicons
                        name="settings-outline"
                        size={34}
                        color="#ffffff"
                    />
                </View>

                <View style={{ width: 42 }} />
            </View>

            <Text style={styles.headerTitle}>
                Configuración
            </Text>

            <Text style={styles.headerSubtitle}>
                Personaliza tu experiencia en la app
            </Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 65,
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
    },

    headerTopRow: {
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },

    settingsIconContainer: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 30,
        fontWeight: "800",
        color: "#ffffff",
        marginTop: 10,
    },

    headerSubtitle: {
        fontSize: 14,
        color: "rgba(255,255,255,0.85)",
        marginTop: 5,
    },
});