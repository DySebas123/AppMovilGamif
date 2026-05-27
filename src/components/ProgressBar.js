import React from "react";

import {
    View,
    StyleSheet,
} from "react-native";

import COLORS from "../styles/colors";

export default function ProgressBar({
    progress = 0,
    height = 8,
    backgroundColor = 'rgba(255,255,255,0.2)',
    fillColor = COLORS.warning,
    borderRadius = 999,
}) {

    return (
        /* Contenedor base que determina el ancho total y el fondo de la barra de progreso */
        <View
            style={[
                styles.background,
                {
                    height,
                    backgroundColor,
                    borderRadius,
                }
            ]}
        >
            {/* Capa interna cuyo ancho porcentual dinamico representa el porcentaje de avance */}
            <View
                style={[
                    styles.fill,
                    {
                        width: `${progress}%`,
                        backgroundColor: fillColor,
                        borderRadius,
                    }
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        overflow: 'hidden', // Asegura que la capa interna no sobresalga de los bordes redondeados
    },
    fill: {
        height: '100%',
    },
});