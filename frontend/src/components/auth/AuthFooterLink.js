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
        /* Contenedor inline horizontal para alinear de forma fluida el texto explicativo y el enlace interactivo */
        <Text style={styles.container}>
            <Text style={styles.text}>{text} {""}</Text>
            <Text
                style={styles.link}
                onPress={onPress}
                suppressHighlighting={true}
            >
                {linkText}
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        textAlign: "center",
        marginTop: SPACING.lg,
        paddingHorizontal: 20,
    },
    text: {
        color: COLORS.textSecondary,
        fontSize: TYPOGRAPHY.bodyMD.fontSize, // Sincroniza el tamano de fuente con la tipografia base global
    },
    link: {
        color: COLORS.primary,
        fontSize: TYPOGRAPHY.bodyMD.fontSize,
        fontWeight: "800",
    },
});