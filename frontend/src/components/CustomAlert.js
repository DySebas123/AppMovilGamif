import React from "react";

import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSettings } from "../context/SettingsContext";

export default function CustomAlert({
    visible,
    title,
    message,
    type = "success",
    confirmMode = false,
    confirmText = "Aceptar",
    cancelText = "Cancelar",
    onClose,
    onConfirm,
    containerColor,
    titleColor,
    messageColor,
}) {

    const { theme } = useSettings();

    // Evalúa el tipo de alerta para condicionar la interfaz visual
    const isSuccess = type === "success";
    const isError = type === "error";
    const isWarning = type === "warning";

    // Asigna la paleta de colores del degradado según el estado de la alerta
    const gradientColors = isSuccess
        ? ["#10b981", "#059669"]
        : isWarning
            ? ["#f97316", "#ea580c"]
            : ["#ef4444", "#dc2626"];

    // Determina el icono correspondiente al comportamiento configurado
    const iconName = isSuccess
        ? "checkmark"
        : isWarning
            ? "warning-outline"
            : "close";

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            {/* Contenedor oscuro semitransparente para bloquear la interfaz trasera */}
            <View style={styles.overlay}>
                <View style={[
                    styles.container, 
                    { backgroundColor: containerColor || theme?.surface || "#ffffff" }
                ]}>
                    {/* Contenedor del icono con fondo degradado dinámico */}
                    <LinearGradient
                        colors={gradientColors}
                        style={styles.iconContainer}
                    >
                        <Ionicons name={iconName} size={34} color="#fff"/>
                    </LinearGradient>

                    <Text style={[styles.title, { color: titleColor }]}>{title} </Text>

                    <Text style={[styles.message, { color: messageColor }]}>{message}</Text>

                    {/* Renderizado condicional: botones gemelos de confirmación o botón único de cierre */}
                    {confirmMode ? (
                        <View style={styles.confirmRow}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                activeOpacity={0.8}
                                onPress={onClose}
                            >
                                <Text style={styles.cancelButtonText}>
                                    {cancelText}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.deleteButton}
                                activeOpacity={0.8}
                                onPress={onConfirm}
                            >
                                <Text style={styles.deleteButtonText}>
                                    {confirmText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: theme.buttonBackground }]}
                            activeOpacity={0.8}
                            onPress={onClose}
                        >
                            <Text style={[styles.buttonText]}>
                                Continuar
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    container: {
        width: "100%",
        maxWidth: 380,
        backgroundColor: "#fff",
        borderRadius: 28,
        padding: 28,
        alignItems: "center",
        elevation: 5, // Necesario en Android para que la superficie sea opaca y tenga profundidad
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 10,
        textAlign: "center",
        width: "100%"
    },

    message: {
        width: "100%",
        alignSelf: "stretch",
        textAlign: "center",
        color: "#64748b",
        fontSize: 13,
        marginBottom: 24
    },

    button: {
        backgroundColor: "#fff",
        width: "100%",
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },

    confirmRow: {
        flexDirection: "row",
        width: "100%",
        gap: 12,
    },

    cancelButton: {
        flex: 1,
        backgroundColor: "#f1f5f9",
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: "center",
    },

    cancelButtonText: {
        color: "#475569",
        fontWeight: "800",
        fontSize: 14,
    },

    deleteButton: {
        flex: 1,
        backgroundColor: "#ef4444",
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: "center",
    },

    deleteButtonText: {
        color: "#ffffff",
        fontWeight: "800",
        fontSize: 14,
    },
});