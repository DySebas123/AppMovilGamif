import React from "react";

import {
    ScrollView,
    View,
    StyleSheet,
} from "react-native";

import { useSettings } from "../../context/SettingsContext";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";

export default function AuthContainer({ children }) {

    const { theme } = useSettings();

    return (
        /* Contenedor con soporte de desplazamiento adaptado para prevenir bloqueos por teclados virtuales */
        <ScrollView
            style={[styles.body, { backgroundColor: theme.secBackground }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {/* Tarjeta de autenticacion centralizada con ancho relativo y restricciones de dimension maxima */}
            <View style={[styles.container, { backgroundColor: theme.surface }]}>
                {children}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,  // Asegura que el contenido pueda expandirse verticalmente para permitir el centrado correcto
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: SPACING.xl,
    },
    container: {
        width: "88%", // Garantiza consistencia visual y margen responsivo en pantallas de diversas densidades
        maxWidth: 420, // Previene el estiramiento excesivo en pantallas de dispositivos mas grandes o tablets
        padding: SPACING.xl,
        borderRadius: 28,
        ...SHADOWS.medium,
    },
});