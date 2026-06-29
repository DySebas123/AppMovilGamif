import { Platform } from 'react-native';

const SHADOWS = {
    small: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
        },
        android: {
            elevation: 2,
        },
        web: {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
    }),

    medium: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
        },
        android: {
            elevation: 5,
        },
        web: {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
        },
    }),

    large: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
        },
        android: {
            elevation: 8,
        },
        web: {
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)',
        },
    }),
};

export default SHADOWS;