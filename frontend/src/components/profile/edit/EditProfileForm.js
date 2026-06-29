import React from "react";

import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../MainButton";

export default function EditProfileForm({
    theme,
    name,
    email,
    errorName,
    errorEmail,
    onChangeName,
    onChangeEmail,
    onSave,
}) {
    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.surface },
            ]}
        >
            <Text
                style={[
                    styles.sectionTitle,
                    { color: theme.textPrimary },
                ]}
            >
                Información personal
            </Text>

            <Text
                style={[
                    styles.label,
                    { color: theme.textPrimary },
                ]}
            >
                Nombre completo
            </Text>

            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: theme.inputBackground || theme.background,
                        borderColor: theme.border,
                    },
                ]}
            >
                <Ionicons
                    name="person-outline"
                    size={20}
                    color={theme.textSecondary}
                />

                <TextInput
                    style={[
                        styles.input,
                        { color: theme.textPrimary },
                    ]}
                    value={name}
                    onChangeText={onChangeName}
                    placeholder="Tu nombre"
                    placeholderTextColor={theme.textSecondary}
                />
            </View>

            {errorName ? (
                <Text style={styles.error}>
                    {errorName}
                </Text>
            ) : null}

            <Text
                style={[
                    styles.label,
                    { color: theme.textPrimary },
                ]}
            >
                Correo electrónico
            </Text>

            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: theme.inputBackground || theme.background,
                        borderColor: theme.border,
                    },
                ]}
            >
                <Ionicons
                    name="mail-outline"
                    size={20}
                    color={theme.textSecondary}
                />

                <TextInput
                    style={[
                        styles.input,
                        { color: theme.textPrimary },
                    ]}
                    value={email}
                    onChangeText={onChangeEmail}
                    placeholder="correo@gmail.com"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {errorEmail ? (
                <Text style={styles.error}>
                    {errorEmail}
                </Text>
            ) : null}

            <View style={{ marginTop: 28 }}>
                <MainButton
                    title="Guardar cambios"
                    onPress={onSave}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        padding: 22,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 10,
        marginTop: 10,
    },

    inputContainer: {
        borderWidth: 1,
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
        fontWeight: "500",
    },

    error: {
        color: "#ef4444",
        fontSize: 12,
        fontWeight: "600",
        marginTop: 8,
        marginLeft: 4,
    },
});