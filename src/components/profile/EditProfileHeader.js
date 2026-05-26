import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";

export default function EditProfileHeader({
    name,
    email,
    userInitial,
    onBack,
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
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={COLORS.white}
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Editar Perfil
                </Text>

                <View style={{ width: 42 }} />
            </View>

            <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>
                    {userInitial}
                </Text>
            </View>

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
        color: COLORS.white,
    },

    avatarContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#134e4a",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: "rgba(255,255,255,0.2)",
        marginBottom: 15,
    },

    avatarText: {
        fontSize: 42,
        fontWeight: "800",
        color: COLORS.white,
    },

    userName: {
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.white,
    },

    userEmail: {
        fontSize: 14,
        color: "rgba(255,255,255,0.8)",
        marginTop: 4,
    },
});