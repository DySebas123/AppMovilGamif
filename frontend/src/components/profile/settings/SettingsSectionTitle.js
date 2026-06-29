import React from "react";

import {
    Text,
    StyleSheet,
} from "react-native";

export default function SettingsSectionTitle({
    title,
    theme,
}) {
    return (
        <Text
            style={[
                styles.sectionTitle,
                { color: theme.textPrimary },
            ]}
        >
            {title}
        </Text>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 24,
    },
});