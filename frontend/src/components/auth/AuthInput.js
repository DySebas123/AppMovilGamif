import React from "react";

import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSettings } from "../../context/SettingsContext";

import COLORS from "../../styles/colors";

export default function AuthInput({
    label,
    icon,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    secureTextEntry,
    autoCapitalize,
    error,
    rightIcon,
    onRightIconPress,
}) {

    const { theme } = useSettings();

    return (
        /* Contenedor del campo con espaciado inferior predeterminado para formularios estructurados */
        <View style={styles.wrapper}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
                {label}
            </Text>

            {/* Contenedor adaptativo que alterna estilos visuales de advertencia en caso de error de validacion */}
            <View
                style={[
                    styles.inputContainer,
                    error && styles.inputError,
                ]}
            >
                <Ionicons
                    name={icon}
                    size={20}
                    color="#64748b"
                    style={styles.icon}
                />
                {/* Control de entrada de texto que expande su ancho para aprovechar el espacio disponible */}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#94a3b8"
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize}
                />
                {rightIcon ? (
                    <Pressable onPress={onRightIconPress} style={styles.rightIcon}>
                        <Ionicons name={rightIcon} size={20} color="#64748b" />
                    </Pressable>
                ) : null}
            </View>
            {/* Mensaje de retroalimentacion condicional inyectado bajo la caja de texto */}
            {error ? (
                <Text style={styles.error}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 14,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 8,
    },
    inputContainer: {
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
    },
    inputError: {
        borderColor: COLORS.danger,
        backgroundColor: "#fff1f2", // Fondo suavizado rojizo para denotar el estado de error
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 14, // Define la altura interactiva interna del control de entrada de texto
        fontSize: 15,
        color: "#1e293b",
    },
    error: {
        color: COLORS.danger,
        fontSize: 12,
        fontWeight: "600",
        marginTop: 6,
    },
    rightIcon: {
        padding: 8,
    }
});