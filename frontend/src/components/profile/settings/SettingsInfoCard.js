import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

function InfoItem({
    icon,
    title,
    description,
    theme,
}) {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
                <Ionicons
                    name={icon}
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
                    {title}
                </Text>

                <Text
                    style={[
                        styles.infoDescription,
                        { color: theme.textSecondary },
                    ]}
                >
                    {description}
                </Text>
            </View>
        </View>
    );
}

export default function SettingsInfoCard({
    theme,
}) {
    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.surface },
            ]}
        >
            <InfoItem
                icon="shield-checkmark-outline"
                title="Privacidad protegida"
                description="Tu información y hábitos permanecen seguros dentro de la aplicación."
                theme={theme}
            />

            <View
                style={[
                    styles.divider,
                    { backgroundColor: theme.border },
                ]}
            />

            <InfoItem
                icon="notifications-circle-outline"
                title="Recordatorios inteligentes"
                description="HabitQuest puede recordarte completar tus hábitos diarios mediante notificaciones."
                theme={theme}
            />

            <View
                style={[
                    styles.divider,
                    { backgroundColor: theme.border },
                ]}
            />

            <InfoItem
                icon="sparkles-outline"
                title="Experiencia optimizada"
                description="La aplicación está diseñada para ayudarte a mantener tus hábitos diariamente."
                theme={theme}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        borderRadius: 22,
        padding: 18,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    infoIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
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

    infoDescription: {
        fontSize: 13,
        lineHeight: 18,
    },

    divider: {
        height: 1,
        marginVertical: 15,
    },
});