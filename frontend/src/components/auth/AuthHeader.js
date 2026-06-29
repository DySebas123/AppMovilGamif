import React from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useSettings } from "../../context/SettingsContext";

import COLORS from "../../styles/colors";

export default function AuthHeader({
    title,
    subtitle,
}) {

    const { theme } = useSettings();

    return (
        /* Contenedor principal orientado verticalmente para centrar el bloque de identidad de la pantalla */
        <View style={styles.container}>
            {/* Contenedor del logotipo con degradado de la paleta oscura y mascara de recorte activa */}
            <LinearGradient
                colors={COLORS.gradientDark}
                style={styles.logoCircle}
            >
                {/* Imagen del recurso local escalada para cubrir la superficie interna del contenedor */}
                <Image
                    source={require("../../../assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="cover"
                />
            </LinearGradient>
            {/* Bloque de textos descriptivos para el encabezado del formulario de acceso */}
            <Text style={[styles.title, { color: theme.textPrimary }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 28,
    },
    logoCircle: {
        width: 88,
        height: 88,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
        overflow: "hidden", // Recorta las esquinas del LinearGradient para respetar el radio del borde
    },
    logo: {
        width: 82,
        height: 82,
        borderRadius: 26, // Sincroniza la curvatura con el contenedor padre para mantener la simetria
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.textPrimary,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
});