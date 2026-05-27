import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";

export default function SettingsHeader({ onBack }) {
    return (
        /* Encabezado con degradado verde/turquesa y base inferior curva para un diseño envolvente */
        <LinearGradient
            colors={["#0f766e", "#10b981"]}
            style={styles.header}
        >
            {/* Fila superior que distribuye el boton de retorno, el icono central y un espaciador de equilibrio */}
            <View style={styles.headerTopRow}>
                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPress={onBack}
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
                {/* Contenedor circular con fondo traslucido para destacar el icono principal de la seccion */}
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="settings-outline"
                        size={34}
                        color={COLORS.white}
                    />
                </View>
                {/* Vista comodin con un ancho simetrico para mantener el icono central perfectamente alineado */}
                <View style={{ width: 42 }} />
            </View>
            <Text style={styles.title}>Configuración</Text>
            <Text style={styles.subtitle}>Personaliza tu experiencia en la app</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 65, // Espaciado superior alto para prevenir superposiciones con la barra de estado nativa
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
    },
    headerTopRow: {
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainer: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: COLORS.white,
        marginTop: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "rgba(255,255,255,0.85)",
        marginTop: 5,
    },
});