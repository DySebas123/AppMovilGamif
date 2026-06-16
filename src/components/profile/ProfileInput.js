import React from "react";

import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../styles/colors";

export default function ProfileInput({
    label,
    icon,
    value,
    onChangeText,
    placeholder,
    error,
    keyboardType,
    autoCapitalize,
    labelColor,
    inputColor,
    valueColor
}) {
    return (
        /* Fragmento estructural para agrupar los elementos sin alterar la jerarquia flex del contenedor padre */
        <>
            <Text style={[styles.label, { color: labelColor }]}>
                {label}
            </Text>
            <View style={[styles.inputContainer, { backgroundColor: inputColor }]}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={COLORS.textSecondary}
                />
                {/* Contenedor horizontal que alinea el icono tematico junto al area de entrada de texto */}
                <TextInput
                    style={[styles.input, { color: valueColor }]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#94a3b8"
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
            </View>
            {/* Alerta de validacion inyectada de manera condicional debajo de la caja de texto */}
            {error ? (
                <Text style={styles.error}>
                    {error}
                </Text>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 10,
        marginTop: 10, // Define un margen simetrico para distanciar el campo de controles adyacentes
    },
    inputContainer: {
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 18,
        paddingHorizontal: 16,
        height: 58, // Fija una altura estatica comoda para la interaccion tactil en pantallas moviles
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1, // Absorbe todo el espacio horizontal remanente a la derecha del icono
        marginLeft: 12,
        fontSize: 15,
        color: COLORS.textPrimary,
        fontWeight: "500",
    },
    error: {
        color: COLORS.danger,
        fontSize: 12,
        fontWeight: "600",
        marginTop: 8,
        marginLeft: 4,
    },
});