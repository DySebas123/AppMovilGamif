import React from "react";

import {
    View,
    StyleSheet,
} from "react-native";

import COLORS from "../styles/colors";

export default function ProgressBar({
    progress = 0,
    height = 8,
    backgroundColor = 'rgba(255,255,255,0.2)',
    fillColor = COLORS.warning,
    borderRadius = 999,
}) {

    return (
        <View
            style={[
                styles.background,
                {
                    height,
                    backgroundColor,
                    borderRadius,
                }
            ]}
        >
            <View
                style={[
                    styles.fill,
                    {
                        width: `${progress}%`,
                        backgroundColor: fillColor,
                        borderRadius,
                    }
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        overflow: 'hidden',
    },

    fill: {
        height: '100%',
    },
});