import React from "react";

import {
    Text,
    StyleSheet,
} from "react-native";

import COLORS from "../styles/colors";

export default function SectionTitle({ title }) {
    return (
        /* Componente de texto plano optimizado para estandarizar los titulos de secciones */
        <Text style={styles.title}>
            {title}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 14,
    },
});