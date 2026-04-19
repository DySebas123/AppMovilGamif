import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image
} from "react-native";

export default function Login({ navigation }) {
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
            setLoading(true);
            setLoading(false);

            navigation.navigate('Habits');
        }, 2000);
    }

    return (
        <View style={styles.container}>

            <Image
                source={{ uri: 'https://cdn-icons-png.freepik.com/512/5778/5778840.png'}}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.header}>Bienvenido</Text>

            <Text style={styles.label}>Correo Electrónico:</Text>
            <TextInput
                style={styles.input}
                keyboardType='email-address'
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholder="ejemplo@gmail.com"
            />

            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}    
                placeholder="************"
            />
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff"/>
                ) : (
                    <Text style={styles.buttonText}>Inicia sesión</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 60
    },
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
