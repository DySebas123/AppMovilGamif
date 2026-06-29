import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function EditProfileHeader({
    name,
    email,
    profileImage,
    userInitial,
    onBack,
    onPickImage,
}) {
    return (
        <LinearGradient
            colors={["#0f766e", "#10b981"]}
            style={styles.header}
        >
            <View style={styles.headerTop}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#ffffff"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Editar Perfil
                </Text>

                <View style={{ width: 42 }} />
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPickImage}
                style={styles.avatarContainer}
            >
                {profileImage ? (
                    <Image
                        source={{ uri: profileImage }}
                        style={styles.avatarImage}
                    />
                ) : (
                    <Text style={styles.avatarText}>
                        {userInitial}
                    </Text>
                )}

                <View style={styles.cameraBadge}>
                    <Ionicons
                        name="camera-outline"
                        size={18}
                        color="#ffffff"
                    />
                </View>
            </TouchableOpacity>

            <Text style={styles.userName}>
                {name || "Usuario"}
            </Text>

            <Text style={styles.userEmail}>
                {email || "correo@gmail.com"}
            </Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
    },

    headerTop: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#ffffff",
    },

    avatarContainer: {
        width: 112,
        height: 112,
        borderRadius: 56,
        backgroundColor: "#134e4a",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: "rgba(255,255,255,0.2)",
        marginBottom: 15,
        overflow: "hidden",
    },

    avatarImage: {
        width: "100%",
        height: "100%",
    },

    avatarText: {
        fontSize: 42,
        fontWeight: "800",
        color: "#ffffff",
    },

    cameraBadge: {
        position: "absolute",
        bottom: 4,
        right: 4,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#0f766e",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#ffffff",
    },

    userName: {
        fontSize: 24,
        fontWeight: "800",
        color: "#ffffff",
    },

    userEmail: {
        fontSize: 14,
        color: "rgba(255,255,255,0.8)",
        marginTop: 4,
    },
});