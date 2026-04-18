import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator
} from "react-native";

export default function Habits() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            Alert.alert('Éxito', `Bienvenido: ${email}`)
        }, 2000);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mis Hábitos</Text>
            <Text style={styles.descr}>Sigue construyendo tu mejor versión</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333'
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        fontSize: 16
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonDisabled: {
        backgroundColor: '#a0caff'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    }
})
