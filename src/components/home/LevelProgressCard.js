import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import ProgressBar from "../ProgressBar";

import COLORS from "../../styles/colors";

export default function LevelProgressCard({
    level,
    xp,
    progressPercentage,
}) {
    return (
        /* Contenedor con degradado diagonal oscuro enfocado en la visualizacion de gamificacion del perfil */
        <LinearGradient
            colors={COLORS.gradientDark}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.levelCard}
        >
            <View style={styles.levelTopRow}>
                <View style={styles.levelLeft}>
                    {/* Fila inline para alinear el icono de estrella con la etiqueta del nivel actual */}
                    <View style={styles.levelBadge}>
                        <Ionicons
                            name="star"
                            size={16}
                            color="#facc15"
                        />
                        <Text style={styles.levelText}>
                            Nivel {level}
                        </Text>
                    </View>
                    <Text style={styles.levelSubtitle}>
                        {xp} XP acumulados
                    </Text>
                </View>
                {/* Redondeo matematico del porcentaje para evitar desbordes por decimales en la interfaz */}
                <Text style={styles.levelPercentage}>
                    {Math.round(progressPercentage)}%
                </Text>
            </View>
            {/* Componente externo encargado del renderizado de la linea de progreso horizontal */}
            <ProgressBar progress={progressPercentage} />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    levelCard: {
        borderRadius: 22,
        padding: 20,
    },
    levelTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    levelLeft: {
        flex: 1,
    },
    levelBadge: {
        flexDirection: "row",
        alignItems: "center",
    },
    levelText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 6,
    },
    levelSubtitle: {
        color: "rgba(255,255,255,0.7)",
        marginTop: 6,
        fontSize: 13,
    },
    levelPercentage: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "800",
    },
});