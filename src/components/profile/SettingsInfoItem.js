import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../styles/colors";

export default function SettingsInfoItem({
    icon,
    title,
    description,
    titleColor,
    descrColor,
}) {
    return (
        /* Fila contenedora alineada al inicio superior para soportar descripciones de multiples lineas */
        <View style={styles.infoRow}>
            {/* Bloque circular que opera como contenedor del icono con un fondo verde suave de contraste */}
            <View style={styles.infoIcon}>
                <Ionicons
                    name={icon}
                    size={22}
                    color="#0f766e"
                />
            </View>
            {/* Bloque de texto estructurado con flex para forzar el ajuste de linea y prevenir desbordes */}
            <View style={{ flex: 1 }}>
                <Text style={[styles.infoTitle, { color: titleColor}]}>
                    {title}
                </Text>
                <Text style={[styles.infoDescription, { color: descrColor}]}>
                    {description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start", // Mantiene el icono fijo arriba si la descripcion se extiende verticalmente
    },
    infoIcon: {
        width: 42,
        height: 42,
        borderRadius: 21, // Forzado de geometria circular exacta basada en la mitad del ancho del componente
        backgroundColor: "#ecfdf5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },
    infoTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    infoDescription: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 18, // Incrementa la separacion entre lineas para mejorar la legibilidad del parrafo
    },
});