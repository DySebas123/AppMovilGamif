import React from "react";

import {
    View,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";

export default function IconSelector({
    icons,
    selectedIcon,
    onSelectIcon,
}) {
    return (
        /* Cuadrícula flexible adaptada para distribuir las opciones de íconos en filas de cuatro columnas */
        <View style={styles.iconGrid}>
            {icons.map((icon) => {
                // Evalúa si el ícono iterado coincide con el identificador del estado seleccionado
                const isSelected = selectedIcon === icon.id;

                return (
                    <TouchableOpacity
                        key={icon.id}
                        style={styles.iconWrapper}
                        activeOpacity={0.8}
                        onPress={() => onSelectIcon(icon.id)}
                    >
                        {/* Renderizado condicional: contenedor con degradado primario o caja con borde neutro */}
                        {isSelected ? (
                            <LinearGradient
                                colors={COLORS.gradientPrimary}
                                style={styles.iconBoxSelected}
                            >
                                <Ionicons
                                    name={icon.name}
                                    size={24}
                                    color={COLORS.white}
                                />
                            </LinearGradient>
                        ) : (
                            <View style={styles.iconBox}>
                                <Ionicons
                                    name={icon.name}
                                    size={24}
                                    color={COLORS.textSecondary}
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    iconGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 12,
        marginBottom: 20,
    },
    iconWrapper: {
        width: "22%", // Define un ancho del 22% para dejar un margen distribuido y formar 4 columnas
    },
    iconBox: {
        width: "100%",
        height: 65,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    iconBoxSelected: {
        width: "100%",
        height: 65,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
});