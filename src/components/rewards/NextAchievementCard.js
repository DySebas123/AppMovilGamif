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

export default function NextAchievementCard({ achievement }) {
    // Retorno temprano de seguridad si el objeto de logro proximo no esta definido
    if (!achievement) return null;

    // Calcula el porcentaje de avance acotando el limite superior al 100%
    const progress = Math.min(
        (achievement.progress / achievement.goal) * 100,
        100
    );

    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Próximo Logro</Text>

            <View style={styles.content}>
                {/* Emblema con fondo degradado personalizado importado desde las propiedades del objeto */}
                <LinearGradient
                    colors={achievement.badgeBg}
                    style={styles.iconBadge}
                >
                    <Ionicons
                        name={achievement.icon}
                        size={26}
                        color={COLORS.white}
                    />
                </LinearGradient>

                <View style={styles.details}>
                    <Text style={styles.title}>{achievement.title}</Text>

                    <Text style={styles.description}>{achievement.description}</Text>

                    {/* Barra de progreso horizontal con calculo dinamico de su ancho en base a la meta */}
                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progress}%` },
                            ]}
                        />
                    </View>

                    {/* Texto informativo que valida que el valor actual no exceda el objetivo final */}
                    <Text style={styles.progressText}>
                        {Math.min(achievement.progress, achievement.goal)} de {achievement.goal}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: 20,
        marginTop: 20,
        ...SHADOWS.small,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 16,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconBadge: {
        width: 60,
        height: 60,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
    description: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
        marginBottom: 10,
    },
    progressBackground: {
        height: 6,
        backgroundColor: "#f1f5f9",
        borderRadius: 3,
        overflow: "hidden", // Recorta el relleno para respetar las esquinas curvas
        marginBottom: 6,
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#0f4c5c",
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: "500",
    },
});