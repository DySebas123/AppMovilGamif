import React from "react";

import {
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";

export default function FloatingAddButton({ onPress }) {
    return (
        /* Componente interactivo posicionado de forma absoluta con sombra pronunciada para efecto de elevacion */
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.fabButton}
            onPress={onPress}
        >
            {/* Contenedor con degradado diagonal oscuro que centra por completo el icono de accion */}
            <LinearGradient
                colors={COLORS.gradientDark}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.fabGradient}
            >
                <Ionicons
                    name="add"
                    size={32}
                    color={COLORS.white}
                />
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fabButton: {
        position: "absolute", // Fija el boton flotante por encima de las demas capas de la pantalla
        bottom: 28,
        right: 24,
        width: 65,
        height: 65,
        borderRadius: 40,
        overflow: "hidden", // Aplica mascara de recorte para que el LinearGradient respete la redondez
        ...SHADOWS.large,
    },

    fabGradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});