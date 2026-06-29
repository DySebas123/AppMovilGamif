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

export default function StatsSummaryCard({
    label,
    value,
    icon,
    colors,
    cardColor,
    valueColor,
    labelColor
}) {
    return (
        /* Tarjeta de resumen con ancho fijo del 48% optimizada para layouts de dos columnas */
        <View style={[styles.card, { backgroundColor: cardColor }]}>

            {/* Contenedor del icono con degradado diagonal personalizado basado en el arreglo de colores recibido */}
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBox}
            >
                <Ionicons
                    name={icon}
                    size={24}
                    color={COLORS.white}
                />
            </LinearGradient>

            {/* Renderizado de la metrica principal y su etiqueta descriptiva correspondiente */}
            <Text style={[styles.value, { color: valueColor }]}>
                {value}
            </Text>

            <Text style={[styles.label, { color: labelColor }]}>
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "48%", // Sincroniza con estructuras de contenedor que implementen flexWrap
        backgroundColor: COLORS.white,
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        ...SHADOWS.small,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    value: {
        fontSize: 25,
        fontWeight: "800",
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    label: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
});