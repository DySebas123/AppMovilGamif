# HabitQuest 📱✨

Aplicación móvil desarrollada con React Native y Expo para la gestión de hábitos, seguimiento de progreso y sistema de recompensas gamificado.

---

# 📌 Descripción del Proyecto

HabitQuest es una aplicación enfocada en ayudar a los usuarios a crear hábitos saludables y mantener constancia mediante estadísticas, recompensas, niveles, rachas y seguimiento diario.

## La aplicación permite:

- Crear hábitos personalizados
- Editar y eliminar hábitos
- Marcar hábitos completados
- Gestionar progreso diario
- Visualizar estadísticas dinámicas
- Desbloquear logros y recompensas
- Simular días para pruebas funcionales
- Administrar perfil y configuraciones
- Persistencia local de datos
- Consumo de datos dinámicos mediante archivo JSON mock local

---

# 🎯 Objetivo del Proyecto

Desarrollar una aplicación móvil moderna utilizando React Native y Expo aplicando:

- Componentización reutilizable
- Manejo de estado global con Context API
- Persistencia de datos local
- Navegación entre pantallas
- Consumo de API mock local
- Manejo de errores y estados de carga
- Diseño responsive y UI moderna
- Arquitectura escalable y organizada

---

# 🛠️ Tecnologías Utilizadas

- React Native
- Expo
- JavaScript
- Context API
- AsyncStorage
- Expo Linear Gradient
- Expo Vector Icons

---

# 📂 Estructura General

```bash
src/
│
├── components/
├── context/
├── navigation/
├── screens/
├── services/
├── styles/
├── data/
└── assets/
```
---

# 📦 Instalación del Proyecto

## 1️⃣ Clonar repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

## 2️⃣ Instalar dependencias

```bash
npm install
```

o

```bash
yarn install
```

---

# 🚀 Dependencias Utilizadas

## Expo

```bash
npx expo install expo-linear-gradient
npx expo install @expo/vector-icons
```

## Navegación

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

## Async Storage

```bash
npx expo install @react-native-async-storage/async-storage
```

---

# ▶️ Ejecución del Proyecto

## Iniciar servidor Expo

```bash
npx expo start
```

## Ejecutar en Android

```bash
npx expo run:android
```

## Ejecutar en Web

```bash
npx expo start --web
```

---

# 📱 Funcionalidades Implementadas

## 🏠 HomeScreen

- Visualización de hábitos diarios
- Barra de progreso
- Estadísticas rápidas
- Frases motivacionales dinámicas
- Navegación rápida

## ➕ CreateHabitScreen

- Creación de hábitos
- Selección de iconos
- Frecuencia diaria o semanal
- Validaciones de formulario

## ✏️ EditHabitScreen

- Edición de hábitos existentes
- Actualización dinámica
- Validaciones

## 📊 StatsScreen

- Estadísticas generales
- Actividad semanal
- Calendario de rachas
- XP y progreso

## 🏆 RewardsScreen

- Sistema de logros
- Desbloqueo de recompensas
- Progreso de objetivos

## 👤 ProfileScreen

- Información del usuario
- Estadísticas personales
- Acceso a configuración

## ⚙️ SettingsScreen

- Configuración general
- Simulación de días
- Reinicio de progreso
- Preferencias del usuario

---

# 🌐 Consumo de API Mock Local

Se implementó consumo de datos dinámicos mediante archivo JSON local.

## Archivo utilizado

```bash
src/data/quotes.json
```

## Servicio

```bash
src/services/quoteService.js
```

## Características implementadas

- Manejo de carga (loading)
- Manejo de errores (try/catch)
- Renderizado condicional
- Obtención dinámica de frases motivacionales

---

# 💾 Persistencia de Datos

La aplicación utiliza AsyncStorage para almacenar:

- Hábitos
- XP
- Configuración
- Historial
- Progreso del usuario

---

# 🧠 Arquitectura Implementada

El proyecto utiliza:

- Context API para estado global
- Componentes reutilizables
- Separación por módulos
- Servicios desacoplados
- Estilos centralizados

---

# 👨‍💻 Autor

- Oliver Saúl Huamaní Tapara
- Dylan Sebastian Ayala Vivanco

Proyecto desarrollado para fines académicos utilizando React Native +
