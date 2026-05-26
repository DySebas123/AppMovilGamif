import React from 'react';

import {
    View,
    TextInput,
    Text,
    StyleSheet,
} from 'react-native';

import COLORS from '../styles/colors';

export default function CustomInput({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
}) {
    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>
                {label}
            </Text>

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 18,
        width: '100%',
    },

    label: {
        fontSize: 14,
        marginBottom: 8,
        color: COLORS.textPrimary,
        fontWeight: '600',
    },

    input: {
        backgroundColor: COLORS.white,

        borderWidth: 1,
        borderColor: COLORS.border,

        padding: 15,

        borderRadius: 14,

        fontSize: 15,
        color: COLORS.textPrimary,
    },
});