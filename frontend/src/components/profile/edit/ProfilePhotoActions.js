import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ProfilePhotoActions({
    theme,
    onPickImage,
    onTakePhoto,
}) {
    return (
        <View style={styles.photoActions}>
            <TouchableOpacity
                style={[
                    styles.photoButton,
                    { backgroundColor: theme.surface },
                ]}
                onPress={onPickImage}
                activeOpacity={0.8}
            >
                <Ionicons
                    name="image-outline"
                    size={18}
                    color="#0f766e"
                />

                <Text style={styles.photoButtonText}>
                    Galería
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.photoButton,
                    { backgroundColor: theme.surface },
                ]}
                onPress={onTakePhoto}
                activeOpacity={0.8}
            >
                <Ionicons
                    name="camera-outline"
                    size={18}
                    color="#0f766e"
                />

                <Text style={styles.photoButtonText}>
                    Cámara
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    photoActions: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },

    photoButton: {
        flex: 1,
        borderRadius: 18,
        paddingVertical: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
    },

    photoButtonText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0f766e",
    },
});