import React from "react";
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import COLORS from '../styles/colors';
import SHADOWS from "../styles/shadows";

export default function MainButton({
    onPress,
    title,
    loading = false,
    colors,
}) {
    return (
        /* Contenedor interactivo bloqueado de forma automatica durante estados de carga */
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
        >
            {/* Capa de fondo con degradado lineal horizontal por defecto */}
            <LinearGradient
                colors={colors || [COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                {/* Renderizado condicional para alternar entre el indicador de espera y el texto del boton */}
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.btnText}>
                        {title}
                    </Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        marginTop: 10,
        borderRadius: 14,
        overflow: 'hidden', // Recorta el degradado interno para respetar los bordes redondeados
        ...SHADOWS.medium,
    },
    gradient: {
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
});