import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";

export default function FrequencySelector({
    frequency,
    onChangeFrequency,
}) {
    return (
        /* Fila horizontal con espaciado uniforme para albergar los botones de seleccion equitativos */
        <View style={styles.row}>
            {["Diario", "Semanal"].map((item) => {
                // Compara la opcion actual del mapeo con el estado de frecuencia activo
                const isActive = frequency === item;

                return (
                    <TouchableOpacity
                        key={item}
                        style={styles.flexBtn}
                        activeOpacity={0.8}
                        onPress={() => onChangeFrequency(item)}
                    >
                        {/* Renderizado condicional: boton con degradado */}
                        {isActive ? (
                            <LinearGradient
                                colors={COLORS.gradientDark}
                                style={styles.activeButton}
                            >
                                <Text style={styles.activeText}>
                                    {item}
                                </Text>
                            </LinearGradient>
                        ) : (
                            <View style={styles.inactiveButton}>
                                <Text style={styles.inactiveText}>
                                    {item}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 25,
    },
    flexBtn: {
        flex: 1, // Distribuye el ancho de los botones de manera proporcional para llenar el contenedor
    },
    activeButton: {
        height: 50,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    activeText: {
        color: COLORS.white,
        fontWeight: "700",
        fontSize: 16,
    },
    inactiveButton: {
        height: 50,
        borderRadius: 16,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: "center",
        alignItems: "center",
    },
    inactiveText: {
        color: COLORS.textSecondary,
        fontWeight: "600",
        fontSize: 16,
    },
});