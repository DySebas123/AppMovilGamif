import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";

export default function HomeHeader({
    userName,
    userInitial,
    profileImage,
    onPressProfile,
}) {
    return (
        <View style={styles.headerRow}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>
                    Buenos días, {userName} 👋
                </Text>

                <Text style={styles.subtitle}>
                    Sigue construyendo tu mejor versión
                </Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressProfile}
            >
                {profileImage ? (
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.avatarImage}
                        />
                    </View>
                ) : (
                    <LinearGradient
                        colors={COLORS.gradientPrimary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.avatarContainer}
                    >
                        <Text style={styles.avatarText}>
                            {userInitial}
                        </Text>
                    </LinearGradient>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SPACING.lg,
    },

    greetingContainer: {
        flex: 1,
        marginRight: 12,
    },

    greeting: {
        fontSize: 24,
        fontWeight: "800",
        color: "#ffffff",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 15,
        color: "#a0a0a0",
    },

    avatarContainer: {
        width: 58,
        height: 58,
        borderRadius: 29,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        ...SHADOWS.small,
    },

    avatarImage: {
        width: "100%",
        height: "100%",
    },

    avatarText: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: "800",
    },
});