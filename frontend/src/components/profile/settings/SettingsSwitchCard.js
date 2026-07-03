import React from "react";

import {
    View,
    Text,
    StyleSheet,
    Switch,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

function SwitchItem({
    icon,
    title,
    subtitle,
    value,
    onChange,
    theme,
}) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.iconCircle}>
                    <Ionicons
                        name={icon}
                        size={20}
                        color="#0f766e"
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text
                        style={[
                            styles.itemText,
                            { color: theme.textPrimary },
                        ]}
                    >
                        {title}
                    </Text>

                    {subtitle ? (
                        <Text
                            style={[
                                styles.itemSubtext,
                                { color: theme.textSecondary },
                            ]}
                        >
                            {subtitle}
                        </Text>
                    ) : null}
                </View>
            </View>

            <Switch
                value={value}
                onValueChange={onChange}
            />
        </View>
    );
}

export default function SettingsSwitchCard({
    theme,
    notifications,
    darkMode,
    onToggleNotifications,
    onToggleDarkMode,
}) {
    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.surface },
            ]}
        >
            <SwitchItem
                icon="notifications-outline"
                title="Notificaciones"
                subtitle="Recibe notificaciones importantes"
                value={notifications}
                onChange={onToggleNotifications}
                theme={theme}
            />

            <View
                style={[
                    styles.divider,
                    { backgroundColor: theme.border },
                ]}
            />

            <SwitchItem
                icon="moon-outline"
                title="Tema oscuro"
                value={darkMode}
                onChange={onToggleDarkMode}
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

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#ecfdf5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    itemText: {
        fontSize: 15,
        fontWeight: "600",
    },

    itemSubtext: {
        fontSize: 12,
        marginTop: 2,
    },

    divider: {
        height: 1,
        marginVertical: 15,
    },
});