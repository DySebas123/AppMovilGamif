import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";

export default function HomeHeader({
    userName,
    userInitial,
    onPressProfile,
    theme,
    textColor
}) {
    return (
        /* Fila de encabezado principal con distribucion horizontal y alineacion centralizada */
        <View style={styles.headerRow}>
            {/* Contenedor de bienvenida estructurado con flex para evitar desbordes ante nombres largos */}
            <View style={styles.greetingContainer}>
                <Text style={[styles.greeting, { color: "#ffffff" }] }>
                    Buenos días, {userName} 👋
                </Text>

                <Text style={[styles.subtitle, { color: "#a0a0a0" }]}>
                    Sigue construyendo tu mejor versión
                </Text>
            </View>

            {/* Componente interactivo circular que opera como acceso directo al perfil de usuario */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressProfile}
            >
                {/* Contenedor del avatar con degradado diagonal primario y sombra ligera incorporada */}
                <LinearGradient
                    colors={COLORS.gradientPrimary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.avatarContainer}
                >
                    <Text style={styles.avatarText}>
                        {userInitial}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SPACING.lg,
    },
    greetingContainer: {
        flex: 1, // Absorbe el espacio sobrante forzando al avatar a mantener su relacion de aspecto fija
        marginRight: 12
    },
    greeting: {
        fontSize: 24,
        fontWeight: "800",
    },
    subtitle: {
        marginTop: 4,
        fontSize: 15,
    },
    avatarContainer: {
        width: 58,
        height: 58,
        borderRadius: 29, // Radio configurado exactamente a la mitad para forzar la geometria circular
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.small,
    },
    avatarText: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: "800",
    },
});