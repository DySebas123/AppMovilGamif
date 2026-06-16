import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSettings } from "../../context/SettingsContext";

export default function InfoBox({ text }) {
    const { theme } = useSettings();

    return (
        /* Contenedor horizontal con colores de fondo y bordes configurados para estilo informativo */
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.secondarySurface,
                    borderColor: theme.border,
                },
            ]}
        >
            <Ionicons
                name="information-circle-outline"
                size={18}
                color={theme.primary}
            />

            {/* Contenedor flex para ajustar y ajustar automaticamente las lineas de texto largo */}
            <Text style={[styles.text, { color: theme.textSecondary }]}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eff6ff",
        borderWidth: 1,
        borderColor: "#dbeafe",
        borderRadius: 16,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 12,
    },
    text: {
        flex: 1,
        marginLeft: 8,
        color: "#1e40af",
        fontSize: 12,
        fontWeight: "600",
    },
});