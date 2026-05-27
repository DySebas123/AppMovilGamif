import React from "react";

import {
    View,
    StyleSheet,
} from "react-native";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";

export default function Card({ children, style }) {
    return (
        /* Contenedor base que permite la sobreescritura de estilos externos mediante un arreglo */
        <View style={[styles.card, style]}>{children}</View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 26,
        padding: 20,
        ...SHADOWS.small, // Aplica la elevacion de sombra predefinida en el archivo de estilos globales
    },
});