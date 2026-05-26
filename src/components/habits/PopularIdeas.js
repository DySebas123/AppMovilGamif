import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../styles/colors";

export default function PopularIdeas({
    ideas,
    onSelectIdea,
}) {
    return (
        <View style={styles.grid}>
            {ideas.map((idea) => (
                <TouchableOpacity
                    key={idea.id}
                    style={styles.item}
                    onPress={() => onSelectIdea(idea.title)}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={idea.icon}
                        size={18}
                        color={COLORS.secondary}
                        style={{ marginRight: 8 }}
                    />

                    <Text style={styles.text}>
                        {idea.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 10,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: "48%",
    },

    text: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: "600",
    },
});