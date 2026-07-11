import React from "react";

import {
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";

export default function QuoteBanner({ quote }) {
    return (
        /* Banner con degradado lineal horizontal y propiedades de sombra ligera */
        <LinearGradient
            colors={COLORS.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.banner}
        >
            <Ionicons
                name="flash-outline"
                size={20}
                color={COLORS.white}
            />
            {/* Texto dinámico con respaldo integrado para evitar campos vacíos en la interfaz */}
            <Text style={styles.bannerText}>
                {quote || "Un día a la vez, un logro a la vez"}
            </Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    banner: {
        marginTop: 10,
        marginBottom: 24,
        borderRadius: 18,
        paddingVertical: 18,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        ...SHADOWS.small,
    },
    bannerText: {
        color: COLORS.white,
        fontSize: 13.5,
        fontWeight: "700",
        flex: 1, // Absorbe el espacio disponible permitiendo el centrado correcto junto al icono
        textAlign: "center",
    },
});