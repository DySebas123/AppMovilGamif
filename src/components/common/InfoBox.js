import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function InfoBox({ text }) {

    return (
        <View style={styles.container}>

            <Ionicons
                name="information-circle-outline"
                size={18}
                color="#2563eb"
            />

            <Text style={styles.text}>
                {text}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#eff6ff",
        borderWidth: 1,
        borderColor: "#dbeafe",
        borderRadius: 16,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 12,
    },

    text: {
        flex: 1,
        marginLeft: 8,
        color: "#1e40af",
        fontSize: 12,
        fontWeight: "600",
    },
});