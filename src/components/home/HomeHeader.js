import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";

export default function HomeHeader({
    userName,
    userInitial,
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
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.textPrimary,
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: COLORS.textSecondary,
    },

    avatarContainer: {
        width: 58,
        height: 58,
        borderRadius: 29,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.small,
    },

    avatarText: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: "800",
    },
});