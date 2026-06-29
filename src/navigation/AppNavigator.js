import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

import CreateHabitScreen from "../screens/habits/CreateHabitScreen";
import EditHabitScreen from "../screens/habits/EditHabitScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
// Importacion nativa de componentes web sin uso actual en este archivo
import { ActivityIndicator, View } from "react-native-web";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            {/* Define el enrutador principal en pila ocultando los encabezados nativos por defecto */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Flujo de pantallas para autenticacion (Login, Registro) */}
                <Stack.Screen name="Auth" component={AuthNavigator} />

                {/* Contenedores del TabNavigator para el flujo principal de la aplicacion */}
                <Stack.Screen name="MainTabs" component={TabNavigator}/>
                <Stack.Screen name="HomeTabs" component={TabNavigator} />

                {/* Pantallas secundarias accesibles desde los modulos de Habitos y Perfil */}
                <Stack.Screen name="CrearHábito" component={CreateHabitScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EditHabit" component={EditHabitScreen} />
                <Stack.Screen name="Editar" component={EditProfileScreen} />
                <Stack.Screen name="Configuración" component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}