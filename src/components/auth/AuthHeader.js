import React from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";

export default function AuthHeader({
    title,
    subtitle,
}) {

    return (
        <View style={styles.container}>

            <LinearGradient
                colors={COLORS.gradientDark}
                style={styles.logoCircle}
            >
                <Image
                    source={require("../../../assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="cover"
                />
            </LinearGradient>

            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        marginBottom: 28,
    },

    logoCircle: {
        width: 88,
        height: 88,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
        overflow: "hidden",
    },

    logo: {
        width: 82,
        height: 82,
        borderRadius: 26,
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.textPrimary,
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
});