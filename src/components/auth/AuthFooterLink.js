import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import COLORS from "../../styles/colors";
import SPACING from "../../styles/spacing";
import TYPOGRAPHY from "../../styles/typography";

export default function AuthFooterLink({
    text,
    linkText,
    onPress,
}) {

    return (
        <View style={styles.container}>

            <Text style={styles.text}>
                {text}
            </Text>

            <TouchableOpacity onPress={onPress}>
                <Text style={styles.link}>
                    {linkText}
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: SPACING.lg,
    },

    text: {
        color: COLORS.textSecondary,
        fontSize: TYPOGRAPHY.bodyMD.fontSize,
        marginRight: 5,
    },

    link: {
        color: COLORS.primary,
        fontSize: TYPOGRAPHY.bodyMD.fontSize,
        fontWeight: "800",
    },
});