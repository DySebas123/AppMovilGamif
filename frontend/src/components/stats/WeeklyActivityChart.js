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

export default function WeeklyActivityChart({
    data,
    level,
    titleColor,
    subtitleColor,
    cardColor,
}) {
    return (
        /* Contenedor principal de la tarjeta con esquinas suavizadas y profundidad de sombra media */
        <View style={[styles.card, { backgroundColor: cardColor }]}>
            <View style={styles.header}>
                <View>
                    <Text style={[styles.title, { color: titleColor }]}>
                        Actividad Semanal
                    </Text>

                    <Text style={[styles.subtitle, { color: subtitleColor}]}>
                        Progreso de los últimos 7 días
                    </Text>
                </View>

                {/* Insignia oscura para el despliegue del nivel del perfil de usuario */}
                <View style={styles.levelBadge}>
                    <Ionicons
                        name="star"
                        size={14}
                        color="#facc15"
                    />

                    <Text style={styles.levelText}>
                        Nivel {level}
                    </Text>
                </View>
            </View>

            {/* Contenedor de la grafica que alinea las columnas en la base inferior del eje Y */}
            <View style={styles.chartContainer}>
                {data.map((item) => {
                    // Determina la proporcion porcentual de la columna en base a las tareas completadas
                    const percentage = (item.completed / item.total) * 100;

                    return (
                        <View
                            key={item.date}
                            style={styles.chartItem}
                        >
                            {/* Fondo gris de la barra con recorte activo para el degradado de llenado vertical */}
                            <View style={styles.barBackground}>
                                <LinearGradient
                                    colors={COLORS.gradientPrimary}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    style={[
                                        styles.barFill,
                                        { height: `${percentage}%` },
                                    ]}
                                />
                            </View>

                            <Text style={styles.dayText}>
                                {item.day}
                            </Text>

                            <Text style={styles.dayValue}>
                                {item.completed}/{item.total}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 28,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        ...SHADOWS.medium,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22,
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

    levelBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0f172a",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
    },
    levelText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 4,
    },
    chartContainer: {
        height: 190,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 8,
    },
    chartItem: {
        flex: 1,
        alignItems: "center",
    },
    barBackground: {
        width: "100%",
        height: 135,
        backgroundColor: "#dedbdb",
        borderRadius: 14,
        overflow: "hidden", // Contiene los bordes del LinearGradient interno
        justifyContent: "flex-end", // Fuerza el crecimiento de la barra desde abajo hacia arriba
        marginBottom: 8,
    },
    barFill: {
        width: "100%",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    dayText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#475569",
    },
    dayValue: {
        fontSize: 11,
        color: "#94a3b8",
        marginTop: 2,
    },
});