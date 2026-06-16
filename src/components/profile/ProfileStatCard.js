import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";

export default function ProfileStatCard({
    icon,
    iconColor,
    backgroundColor,
    value,
    label,
    theme,
    numberColor,
    labelColor
}) {
    return (
        /* Contenedor adaptativo optimizado para distribuirse de forma equivalente dentro de filas contenedoras */
        <View style={[styles.card, { backgroundColor: theme?.secondarySurface || COLORS.white}]}>

            {/* Contenedor circular con fondo dinamico inyectado mediante propiedades directas */}
            <View
                style={[
                    styles.iconCircle,
                    { backgroundColor },
                ]}
            >
                <Ionicons
                    name={icon}
                    size={20}
                    color={iconColor}
                />
            </View>

            {/* Bloque metrico de texto para el despliegue del valor cuantitativo y su descripcion */}
            <Text style={[styles.number, { color: numberColor }]}>{value}</Text>
            <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        flex: 1, // Permite que la tarjeta se expanda equitativamente junto a otros elementos hermanos
        paddingVertical: 12,
        borderRadius: 18,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f1f5f9",
        ...SHADOWS.small,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20, // Forzado de geometria circular exacta basada en el radio medio del diametro
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    number: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.textPrimary,
    },
    label: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
});