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

export default function AchievementCard({ item }) {
    return (
        /* Estructura de tarjeta con dimensiones para cuadriculas de dos columnas y atenuacion si esta bloqueada */
        <View
            style={[
                styles.card,
                !item.unlocked && styles.lockedCard,
            ]}
        >
            {/* Contenedor del icono con degradado dinamico o paleta gris neutra segun el estado del logro */}
            <LinearGradient
                colors={
                    item.unlocked
                        ? item.badgeBg
                        : ["#e2e8f0", "#cbd5e1"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBadge}
            >
                <Ionicons
                    name={item.unlocked ? item.icon : "lock-closed"}
                    size={28}
                    color={item.unlocked ? COLORS.white : "#94a3b8"}
                />
            </LinearGradient>

            <Text style={styles.title}>
                {item.title}
            </Text>

            <Text style={styles.description}>
                {item.description}
            </Text>

            {/* Renderizado condicional: etiqueta de exito o contador acotado de progreso actual contra meta */}
            {item.unlocked ? (
                <View style={styles.unlockedBadge}>
                    <Text style={styles.unlockedText}>
                        Desbloqueado
                    </Text>
                </View>
            ) : (
                <View style={styles.lockedBadge}>
                    <Ionicons
                        name="lock-closed"
                        size={12}
                        color="#94a3b8"
                        style={{ marginRight: 4 }}
                    />

                    <Text style={styles.lockedText}>
                        {Math.min(item.progress, item.goal)}/{item.goal}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        width: "48%", // Sincroniza con distribuciones flexWrap 'space-between'
        borderRadius: 20,
        padding: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f1f5f9",
        ...SHADOWS.small,
    },
    lockedCard: {
        opacity: 0.85,
    },
    iconBadge: {
        width: 60,
        height: 60,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.textPrimary,
        textAlign: "center",
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 16,
        marginBottom: 12,
        flex: 1, // Desplaza las etiquetas inferiores para mantener la alineacion vertical uniforme
    },
    unlockedBadge: {
        backgroundColor: "#f0fdf4",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    unlockedText: {
        color: COLORS.success,
        fontSize: 11,
        fontWeight: "700",
    },
    lockedBadge: {
        backgroundColor: "#f1f5f9",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    lockedText: {
        color: "#94a3b8",
        fontSize: 11,
        fontWeight: "600",
    },
});