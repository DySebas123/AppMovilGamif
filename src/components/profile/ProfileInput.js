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
}) {
    return (
        <>
            <Text style={styles.label}>
                {label}
            </Text>

            <View style={styles.inputContainer}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={COLORS.textSecondary}
                />

                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#94a3b8"
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
            </View>

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
        marginTop: 10,
    },

    inputContainer: {
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 18,
        paddingHorizontal: 16,
        height: 58,
        flexDirection: "row",
        alignItems: "center",
    },

    input: {
        flex: 1,
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