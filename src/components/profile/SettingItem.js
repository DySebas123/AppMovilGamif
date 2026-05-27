import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../styles/colors";

export default function SettingItem({
    icon,
    label,
    value,
    last,
    isDestructive,
    onPress,
}) {
    return (
        /* Componente tactil que remueve el borde inferior de forma condicional si es el ultimo elemento */
        <TouchableOpacity
            style={[
                styles.item,
                last && { borderBottomWidth: 0 },
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.left}>
                {/* Contenedor del icono con inyeccion de estilos especificos*/}
                <View
                    style={[
                        styles.iconContainer,
                        isDestructive && styles.iconContainerDestructive,
                    ]}
                >
                    <Ionicons
                        name={icon}
                        size={22}
                        color={isDestructive ? COLORS.danger : COLORS.textSecondary}
                    />
                </View>
                <View>
                    <Text
                        style={[
                            styles.label,
                            isDestructive && styles.labelDestructive,
                        ]}
                    >
                        {label}
                    </Text>
                    {value ? (
                        <Text style={styles.value}>
                            {value}
                        </Text>
                    ) : null}
                </View>
            </View>
            <Ionicons
                name="chevron-forward"
                size={20}
                color="#cbd5e1"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    iconContainerDestructive: {
        backgroundColor: "#fee2e2",
        borderRadius: 10,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#334155",
    },
    labelDestructive: {
        color: COLORS.danger,
        fontWeight: "600",
    },
    value: {
        fontSize: 12,
        color: COLORS.success,
        fontWeight: "500",
    },
});