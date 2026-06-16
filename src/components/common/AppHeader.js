import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSettings } from "../../context/SettingsContext";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";
import TYPOGRAPHY from "../../styles/typography";

export default function AppHeader({
    title,
    icon = "arrow-back",
    onBack,
    style,
}) {
    const { theme } = useSettings();

    return (
        /* Contenedor del encabezado con esquinas inferiores redondeadas y sombra ligera */
        <LinearGradient
            colors={["#06402B", "#065f46"]}
            style={[styles.header, style]}
        >
            <TouchableOpacity
                style={[styles.backButton, { backgroundColor: theme.secondarySurface }]}
                onPress={onBack}
                activeOpacity={0.7}
            >
                <Ionicons name={icon} size={28} color={theme.textPrimary}/>
            </TouchableOpacity>

            <Text style={[styles.title, { color: "#ffffff" }]}>{title}</Text>

            {/* Espaciador con el mismo ancho que el boton para simular una distribucion simetrica equilibrada */}
            <View style={{ width: 42 }} />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 55, // Espaciado superior estatico para librar la barra de estado nativa
        paddingBottom: 18,
        paddingHorizontal: SPACING.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        ...SHADOWS.small,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#f1f5f9",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        ...TYPOGRAPHY.titleMD,
        color: COLORS.textPrimary,
    },
});