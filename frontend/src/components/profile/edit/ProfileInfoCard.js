import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ProfileInfoCard({
    theme,
}) {
    return (
        <View
            style={[
                styles.infoCard,
                { backgroundColor: theme.surface },
            ]}
        >
            <View style={styles.infoIcon}>
                <Ionicons
                    name="shield-checkmark-outline"
                    size={22}
                    color="#0f766e"
                />
            </View>

            <View style={{ flex: 1 }}>
                <Text
                    style={[
                        styles.infoTitle,
                        { color: theme.textPrimary },
                    ]}
                >
                    Perfil seguro
                </Text>

                <Text
                    style={[
                        styles.infoText,
                        { color: theme.textSecondary },
                    ]}
                >
                    Puedes actualizar tu información, foto de perfil y ubicación usando funciones nativas del dispositivo.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoCard: {
        marginTop: 20,
        borderRadius: 22,
        padding: 18,
        flexDirection: "row",
        alignItems: "flex-start",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
    },

    infoIcon: {
        width: 45,
        height: 45,
        borderRadius: 22,
        backgroundColor: "#ecfdf5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    infoTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 4,
    },

    infoText: {
        fontSize: 13,
        lineHeight: 20,
    },
});