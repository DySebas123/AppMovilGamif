import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ProfileMenuItem({
    icon,
    label,
    value,
    last,
    isDestructive,
    onPress,
    theme,
}) {
    return (
        <TouchableOpacity
            style={[
                styles.settingItem,
                { borderBottomColor: theme.border },
                last && { borderBottomWidth: 0 },
            ]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={!onPress}
        >
            <View style={styles.settingLeft}>
                <View
                    style={[
                        styles.iconContainer,
                        isDestructive && styles.iconContainerDestructive,
                    ]}
                >
                    <Ionicons
                        name={icon}
                        size={22}
                        color={isDestructive ? "#ef4444" : theme.textSecondary}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text
                        style={[
                            styles.settingLabel,
                            { color: theme.textPrimary },
                            isDestructive && styles.labelDestructive,
                        ]}
                    >
                        {label}
                    </Text>

                    {value ? (
                        <Text
                            style={[
                                styles.settingValue,
                                {
                                    color: isDestructive
                                        ? "#ef4444"
                                        : theme.textSecondary,
                                },
                            ]}
                        >
                            {value}
                        </Text>
                    ) : null}
                </View>
            </View>

            {onPress ? (
                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={theme.textSecondary}
                />
            ) : null}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
    },

    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    iconContainer: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    settingLabel: {
        fontSize: 15,
        fontWeight: "600",
    },

    settingValue: {
        fontSize: 12,
        fontWeight: "500",
        marginTop: 2,
    },

    iconContainerDestructive: {
        backgroundColor: "#fee2e2",
        borderRadius: 10,
    },

    labelDestructive: {
        color: "#ef4444",
        fontWeight: "600",
    },
});