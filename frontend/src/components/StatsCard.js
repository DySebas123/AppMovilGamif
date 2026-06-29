import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../styles/colors";
import SHADOWS from "../styles/shadows";

export default function StatsCard({
    icon,
    iconColor,
    cardColor,
    title,
    value,
    theme,
    titleColor,
    valueColor,
    iconContColor
}) {
    return (
        /* Tarjeta con ancho relativo adaptada para layouts de cuadricula de dos columnas */
        <View style={[styles.card, { backgroundColor: cardColor }]}> 
            {/* Contenedor del icono con color de fondo configurable dinamicamente */}
            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor: iconContColor }
                ]}
            >
                <Ionicons name={icon} size={22} color={iconColor}/>
            </View>
            {/* Contenedor flex para evitar el desbordamiento de las etiquetas de texto */}
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
                <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        width: '48%', // Permite el espaciado automatico si se combina con un flexWrap 'space-between'
        padding: 16,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#f1f5f9",
        ...SHADOWS.small,
    },
    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    value: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.textPrimary,
    },
});