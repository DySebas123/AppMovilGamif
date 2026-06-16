import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";

export default function ProfileHeader({
    userName,
    userEmail,
    userInitial,
    level,
}) {
    return (
        /* Contenedor superior con degradado esmeralda y curvatura en la base inferior */
        <LinearGradient
            colors={["#065f46", "#10b982"]}
            style={styles.headerGradient}
        >
            {/* Contenedor centralizado para alinear verticalmente los elementos del perfil */}
            <View style={styles.profileInfo}>
                {/* Estructura circular del avatar con borde traslucido de contraste */}
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                        {userInitial}
                    </Text>
                </View>
                <Text style={styles.userName}>
                    {userName}
                </Text>
                <Text style={styles.userEmail}>
                    {userEmail}
                </Text>
                {/* Insignia de nivel con fondo oscurecido traslucido para legibilidad sobre el degradado */}
                <View style={styles.levelBadge}>
                    <Ionicons
                        name="star"
                        size={16}
                        color="#fbbf24"
                    />
                    <Text style={styles.levelBadgeText}>
                        Nivel {level}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerGradient: {
        paddingTop: 60,
        paddingBottom: 40,
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileInfo: {
        alignItems: "center",
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#1e3a8a",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        borderWidth: 4,
        borderColor: "rgba(255,255,255,0.2)",
    },
    avatarText: {
        color: COLORS.white,
        fontSize: 40,
        fontWeight: "bold",
    },
    userName: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: "bold",
    },
    userEmail: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 14,
        marginBottom: 20,
    },
    levelBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    levelBadgeText: {
        color: COLORS.white,
        fontWeight: "bold",
        marginLeft: 8,
    },
});