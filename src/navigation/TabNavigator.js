import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from '../screens/home/HomeScreen'
import StatsScreen from "../screens/stats/StatsScreen";
import RewardsScreen from "../screens/rewards/RewardsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

import CreateHabitScreen from "../screens/habits/CreateHabitScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Inicio') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Estadísticas') {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    } else if (route.name === 'Recompensas') {
                        iconName = focused ? 'ribbon' : 'ribbon-outline'; 
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                
                tabBarActiveTintColor: '#1d4ed8',
                tabBarInactiveTintColor: '#94a3b8',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#f1f5f9',
                    height: 90,
                    paddingTop: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Inicio" component={HomeScreen}/>
            <Tab.Screen name="Estadísticas" component={StatsScreen}/>
            <Tab.Screen name="Recompensas" component={RewardsScreen}/>
            <Tab.Screen name="Perfil" component={ProfileScreen}/>

            <Tab.Screen 
                name="Configuración" 
                component={SettingsScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="CrearHábito" 
                component={CreateHabitScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="Editar" 
                component={EditProfileScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: 'none' }
                }}
            />
        </Tab.Navigator>
    )
} 