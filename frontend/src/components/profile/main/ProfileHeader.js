import React from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileHeader({
    userName,
    userEmail,
    userInitial,
    profileImage,
    level,
}) {
    return (
        <LinearGradient
            colors={["#065f46", "#10b981"]}
            style={styles.headerGradient}
        >
            <View style={styles.profileInfo}>
                <View style={styles.avatarContainer}>
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
                </View>

                <Text style={styles.userName}>
                    {userName}
                </Text>

                <Text style={styles.userEmail}>
                    {userEmail}
                </Text>

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
        width: 106,
        height: 106,
        borderRadius: 53,
        backgroundColor: "#1e3a8a",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        borderWidth: 4,
        borderColor: "rgba(255,255,255,0.2)",
        overflow: "hidden",
    },

    avatarImage: {
        width: "100%",
        height: "100%",
    },

    avatarText: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
    },

    userName: {
        color: "#fff",
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
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
});