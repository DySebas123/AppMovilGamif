import React from "react";

import {
    ScrollView,
    View,
    StyleSheet,
} from "react-native";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";

export default function AuthContainer({ children }) {

    return (
        <ScrollView
            style={styles.body}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                {children}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: "#eefafa",
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: SPACING.xl,
    },

    container: {
        backgroundColor: COLORS.white,

        width: "88%",
        maxWidth: 420,

        padding: SPACING.xl,
        borderRadius: 28,

        ...SHADOWS.medium,
    },
});