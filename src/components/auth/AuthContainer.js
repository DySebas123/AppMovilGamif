import React from "react";

import {
    ScrollView,
    View,
    StyleSheet,
} from "react-native";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";

export default function AuthContainer({ children }) {
    return (
        /* Contenedor con soporte de desplazamiento adaptado para prevenir bloqueos por teclados virtuales */
        <ScrollView
            style={styles.body}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {/* Tarjeta de autenticacion centralizada con ancho relativo y restricciones de dimension maxima */}
            <View style={styles.container}>
                {children}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#eefafa",
    },
    scrollContent: {
        flexGrow: 1,  // Asegura que el contenido pueda expandirse verticalmente para permitir el centrado correcto
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: SPACING.xl,
    },
    container: {
        backgroundColor: COLORS.white,
        width: "88%", // Garantiza consistencia visual y margen responsivo en pantallas de diversas densidades
        maxWidth: 420, // Previene el estiramiento excesivo en pantallas de dispositivos mas grandes o tablets
        padding: SPACING.xl,
        borderRadius: 28,
        ...SHADOWS.medium,
    },
});