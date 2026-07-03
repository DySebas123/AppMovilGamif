import React from "react";

import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Platform,
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
        <View style={styles.wrapper}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
                {label}
            </Text>

            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: theme.secondarySurface,
                        borderColor: error ? COLORS.danger : theme.border,
                    },
                    error && styles.inputError,
                ]}
            >
                <Ionicons
                    name={icon}
                    size={20}
                    color={theme.textSecondary}
                    style={styles.icon}
                />

                <TextInput
                    style={[
                        styles.input,
                        { color: theme.textPrimary },
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={theme.textSecondary}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={false}
                    textContentType="none"
                    autoComplete="off"
                />

                {Platform.OS !== "web" && rightIcon ? (
                    <Pressable
                        onPress={onRightIconPress}
                        style={styles.rightIcon}
                    >
                        <Ionicons
                            name={rightIcon}
                            size={20}
                            color={theme.textSecondary}
                        />
                    </Pressable>
                ) : null}
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
        marginBottom: 8,
    },

    inputContainer: {
        borderWidth: 1,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
    },

    inputError: {
        backgroundColor: "#fff1f2",
    },

    icon: {
        marginRight: 8,
    },

    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
    },

    error: {
        color: COLORS.danger,
        fontSize: 12,
        fontWeight: "600",
        marginTop: 6,
    },

    rightIcon: {
        padding: 8,
    },
});