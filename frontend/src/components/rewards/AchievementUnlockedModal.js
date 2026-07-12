import React from "react";

import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSettings } from "../../context/SettingsContext";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";

export default function AchievementUnlockedModal({
    achievement,
    visible,
    onClose,
}) {

    const { theme } = useSettings();

    if (!achievement) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.card, { backgroundColor: theme.surface }]}>
                    <LinearGradient
                        colors={achievement.badgeBg || ["#eab308", "#facc15"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.iconBadge}
                    >
                        <Ionicons
                            name={achievement.icon || "trophy"}
                            size={48}
                            color={COLORS.white}
                        />
                    </LinearGradient>

                    <Text style={styles.eyebrow}>
                        ¡Nuevo logro desbloqueado!
                    </Text>

                    <Text style={[styles.title, {color: theme.textPrimary}]}>
                        {achievement.title}
                    </Text>

                    <Text style={[styles.description, {color: theme.textSecondary}]}>
                        {achievement.description}
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onClose}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            Genial
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    card: {
        width: "100%",
        maxWidth: 340,
        backgroundColor: COLORS.white,
        borderRadius: 28,
        paddingVertical: 32,
        paddingHorizontal: 24,
        alignItems: "center",
        ...SHADOWS.medium,
    },
    iconBadge: {
        width: 96,
        height: 96,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    eyebrow: {
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.textThird,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 10,
    },
    title: {
        width: "100%",
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.textPrimary,
        textAlign: "center",
        marginBottom: 3,
    },
    description: {
        width: "100%",
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 24,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 16,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "700",
    },
});