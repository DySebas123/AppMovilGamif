import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Habits from './Habits';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Habits" 
          component={Habits} 
          options={{ title: 'Mis Hábitos' }} // Opcional: título en la barra superior
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
