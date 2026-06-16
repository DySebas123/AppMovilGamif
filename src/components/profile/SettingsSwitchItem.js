import React from "react";

import {
    View,
    Text,
    StyleSheet,
    Switch,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../styles/colors";

export default function SettingsSwitchItem({
    icon,
    label,
    value,
    onChange,
    text
}) {
    return (
        /* Elemento de fila con distribucion horizontal para separar el bloque informativo del control interactivo */
        <View style={styles.item}>
            {/* Bloque alineado a la izquierda que consolida el icono descriptivo y la etiqueta de la opcion */}
            <View style={styles.itemLeft}>
                <View style={styles.iconCircle}>
                    <Ionicons
                        name={icon}
                        size={20}
                        color="#0f766e"
                    />
                </View>
                <Text style={[styles.itemText, { color: text}]}>
                    {label}
                </Text>
            </View>
            {/* Interruptor booleano nativo controlado directamente por el estado global de configuracion */}
            <Switch
                value={value}
                onValueChange={onChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
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
        color: "#334155",
    },
});