import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSettings } from "../context/SettingsContext";

import COLORS from "../styles/colors";
import SHADOWS from "../styles/shadows";

export default function HabitCard({
    title,
    type,
    streak,
    completed,
    onPress,
    onLongPress,
    onDelete,
    cardColor,
}) {
    const { theme } = useSettings() || {};

    return (
        /* Contenedor fila que alinea la tarjeta interactiva con el boton lateral de borrado */
        <View style={styles.wrapper}>
            {/* Contenedor principal del habito con soporte para pulsacion corta y prolongada (edicion) */}
            <TouchableOpacity
                style={[
                    styles.card,
                    { backgroundColor: cardColor || COLORS.white },
                    completed && styles.cardCompleted,
                ]}
                onPress={onPress}
                onLongPress={onLongPress}
                activeOpacity={0.7}
            >
                <View style={styles.leftContent}>
                    {/* Icono de estado de seleccion dinamica segun la bandera de completado */}
                    <Ionicons
                        name={
                            completed
                                ? "checkmark-circle"
                                : "ellipse-outline"
                        }
                        size={30}
                        color={
                            completed
                                ? theme.success
                                : theme.textSecondary
                        }
                        style={styles.icon}
                    />
                    <View>
                        {/* Texto del titulo con estilo tachado condicional si esta completado */}
                        <Text
                            style={[
                                styles.title,
                                { color: theme.textPrimary },
                                completed && styles.textCompleted,
                            ]}
                        >
                            {title}
                        </Text>

                        <Text style={[styles.type, { color: theme.textSecondary }]}>
                            {type}
                        </Text>
                    </View>
                </View>

                {/* Indicador de racha actual con contador de dias acumulados */}
                <View style={styles.streakBadge}>
                    <Ionicons name="flame" size={16} color="#f97316"/>
                    <Text style={styles.streakText}>
                        {streak}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Boton de eliminacion directa que dispara el flujo del modal de advertencia */}
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete()}
                activeOpacity={0.7}
            >
                <Ionicons name="trash-outline" size={20} color="#ef4444"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },
    card: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f1f5f9",
        ...SHADOWS.small,
    },
    cardCompleted: {
        opacity: 0.75,
    },
    leftContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    icon: {
        marginRight: 12,
    },
    title: {
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
    textCompleted: {
        textDecorationLine: "line-through",
        color: COLORS.textSecondary,
    },
    type: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    streakBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fde68a",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    streakText: {
        marginLeft: 4,
        color: "#b45309",
        fontWeight: "700",
        fontSize: 13,
    },
    deleteButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#fee2e2",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
});