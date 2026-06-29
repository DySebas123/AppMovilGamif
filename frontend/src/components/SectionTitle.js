import React from "react";

import {
    Text,
    StyleSheet,
} from "react-native";

import { useSettings } from "../context/SettingsContext";
import COLORS from "../styles/colors";

export default function SectionTitle({ title }) {
    const { theme } = useSettings();

    return (
        /* Componente de texto plano optimizado para estandarizar los titulos de secciones */
        <Text style={[styles.title, { color: theme.textPrimary || COLORS.textPrimary }] }>
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