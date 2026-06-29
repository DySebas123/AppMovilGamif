import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";

export default function StreakCalendar({
    data,
    cardColor,
    titleColor,
    subtitleColor,
}) {
    return (
        /* Contenedor principal del calendario con bordes suavizados y sombra de profundidad media */
        <View style={[styles.card, { backgroundColor: cardColor}]}>
            <Text style={[styles.title, { color: titleColor}]}>
                Calendario de Rachas
            </Text>

            <Text style={[styles.subtitle, { color: subtitleColor }]}>
                Últimos 28 días según historial real
            </Text>

            {/* Cuadrícula de distribución dinámica basada en flexWrap para organizar las celdas */}
            <View style={styles.grid}>
                {data.map((item) => (
                    <View
                        key={item.date}
                        style={styles.cell}
                    >
                        {/* Renderizado condicional: degradado para días activos o contenedor gris para días vacíos */}
                        {item.completed ? (
                            <LinearGradient
                                colors={COLORS.gradientPrimary}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.completed}
                            />
                        ) : (
                            <View style={styles.empty} />
                        )}
                    </View>
                ))}
            </View>

            {/* Fila inferior de referencias visuales para la interpretación de los estados del mapa de calor */}
            <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                    <View style={styles.legendEmpty} />

                    <Text style={styles.legendText}>
                        Sin completar
                    </Text>
                </View>

                <View style={styles.legendItem}>
                    <LinearGradient
                        colors={COLORS.gradientPrimary}
                        style={styles.legendCompleted}
                    />

                    <Text style={styles.legendText}>
                        Completado
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 28,
        padding: 20,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        ...SHADOWS.medium,
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.textPrimary,
    },
    subtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    grid: {
        marginTop: 18,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 10,
    },
    cell: {
        width: "12.5%", // Define la proporción exacta para la alineación de columnas equidistantes
        aspectRatio: 1, // Forzar relación de aspecto cuadrada en cada celda del calendario
        padding: 2,
    },
    completed: {
        flex: 1,
        borderRadius: 8,
    },
    empty: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: "#dedbdb",
    },
    legendRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 18,
        marginTop: 18,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    legendEmpty: {
        width: 12,
        height: 12,
        backgroundColor: "#dedbdb",
        borderRadius: 4,
        marginRight: 6,
    },
    legendCompleted: {
        width: 12,
        height: 12,
        borderRadius: 4,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: "500",
    },
});