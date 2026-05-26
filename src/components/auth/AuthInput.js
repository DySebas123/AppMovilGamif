import React from "react";

import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

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
}) {

    return (
        <View style={styles.wrapper}>

            <Text style={styles.label}>
                {label}
            </Text>

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

            </View>

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
        backgroundColor: "#fff1f2",
    },

    icon: {
        marginRight: 8,
    },

    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        color: "#1e293b",
    },

    error: {
        color: COLORS.danger,
        fontSize: 12,
        fontWeight: "600",
        marginTop: 6,
    },
});