# HabitQuest 📱✨

Aplicación móvil desarrollada con **React Native + Expo** para la gestión inteligente de hábitos mediante técnicas de gamificación. HabitQuest integra una arquitectura Cliente–Servidor con **Node.js**, **Express**, **Supabase PostgreSQL**, **Supabase Storage** y autenticación segura mediante **JWT**, ofreciendo una experiencia moderna, dinámica e intuitiva.

---

# 📌 Descripción del Proyecto

HabitQuest es una aplicación móvil diseñada para ayudar a los usuarios a desarrollar hábitos positivos mediante un sistema de gamificación que incentiva la constancia y el progreso personal.

La aplicación permite administrar hábitos diarios, visualizar estadísticas, obtener recompensas, personalizar el perfil del usuario y utilizar funcionalidades nativas del dispositivo como cámara, galería, GPS y notificaciones.

Toda la información se almacena de forma persistente mediante **Supabase PostgreSQL**, mientras que las fotografías de perfil son gestionadas mediante **Supabase Storage**.

---

# Descargar la aplicación

![QR de descargas](./frontend/assets/images/qr-apk.png)

o descárgalo aquí [aquí](https://github.com/DySebas123/AppMovilGamif/releases/download/v1.0.0/HabitQuest.apk)

---

# 🎯 Objetivos del Proyecto

Desarrollar una aplicación móvil moderna aplicando buenas prácticas de Ingeniería de Software mediante:

- Arquitectura Cliente–Servidor.
- Arquitectura modular y escalable.
- Componentización reutilizable.
- Navegación mediante React Navigation.
- Consumo de API REST propia.
- Autenticación segura mediante JWT.
- Persistencia de datos mediante Supabase PostgreSQL.
- Almacenamiento de imágenes mediante Supabase Storage.
- Integración de funcionalidades nativas de Expo.
- Interfaz moderna, intuitiva y responsive.

---

# 🚀 Funcionalidades Implementadas

## 🔐 Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Autenticación mediante JWT.
- Validación de token.
- Protección de rutas privadas.
- Cierre de sesión.

---

## 👤 Gestión del Perfil

- Visualización del perfil.
- Edición de nombre.
- Edición de correo electrónico.
- Cambio de fotografía.
- Captura desde cámara.
- Selección desde galería.
- Obtención de ubicación mediante GPS.
- Almacenamiento de imágenes en Supabase Storage.

---

## ✅ Gestión de Hábitos

- Crear hábitos.
- Editar hábitos.
- Eliminar hábitos.
- Completar hábitos.
- Gestión automática de rachas.
- Sistema de experiencia (XP).
- Sistema de niveles.
- Historial de progreso.
- Simulación de días.
- Reinicio del progreso.

---

## 📊 Estadísticas

- XP acumulado.
- Nivel alcanzado.
- Hábitos completados.
- Mejor racha.
- Total de hábitos.
- Avance del usuario.

---

## 🏆 Sistema de Recompensas

- Logros desbloqueables.
- Sistema de experiencia.
- Gamificación.
- Progreso del usuario.

---

## ⚙️ Configuración

- Tema claro.
- Tema oscuro.
- Activación de notificaciones.
- Configuración sincronizada con el Back-end.

---

## 💬 Frases Motivacionales

- Consumo mediante API REST.
- Selección aleatoria.
- Información almacenada en Supabase.

---

# 🛠 Tecnologías Utilizadas

## 📱 Front-end

- React Native
- Expo
- JavaScript ES6+
- React Navigation
- Context API
- Axios
- Expo Image Picker
- Expo Location
- Expo Notifications
- Expo Linear Gradient
- Expo Vector Icons

---

## 🌐 Back-end

- Node.js
- Express
- JWT (jsonwebtoken)
- bcryptjs
- Multer
- CORS
- dotenv

---

## ☁️ Base de Datos

- Supabase
- PostgreSQL
- Supabase Storage

---

# 📦 Dependencias

## Front-end

Instalar todas las dependencias:

```bash
npm install
```

Dependencias principales

```bash
npm install axios

npm install @react-navigation/native

npm install @react-navigation/bottom-tabs

npm install @react-navigation/native-stack

npx expo install react-native-screens

npx expo install react-native-safe-area-context

npx expo install @expo/vector-icons

npx expo install expo-linear-gradient

npx expo install expo-image-picker

npx expo install expo-location

npx expo install expo-notifications

npx expo install expo-font
```

---

## Back-end

```bash
cd backend

npm install
```

Dependencias principales

```bash
npm install express

npm install cors

npm install dotenv

npm install jsonwebtoken

npm install bcryptjs

npm install multer

npm install uuid

npm install @supabase/supabase-js
```

Dependencia de desarrollo

```bash
npm install --save-dev nodemon
```

# 🌐 Variables de Entorno

Crear un archivo **.env** dentro de la carpeta **backend** con la siguiente configuración:

```env
PORT=3000

JWT_SECRET=tu_clave_jwt

SUPABASE_URL=https://TU_PROYECTO.supabase.co

SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
```

---

# ☁️ Configuración de Supabase

Antes de ejecutar el proyecto es necesario crear un proyecto en Supabase.

El proyecto utiliza:

- Supabase PostgreSQL para la persistencia de datos.
- Supabase Storage para almacenar las fotografías de perfil.
- Service Role Key para la comunicación segura desde el Back-end.

Las tablas principales implementadas son:

- users
- habits
- progress
- settings
- quotes

---

# 🚀 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/HabitQuest.git
```

Ingresar al proyecto

```bash
cd HabitQuest
```

---

## 2. Instalar dependencias del Front-end

```bash
npm install
```

---

## 3. Instalar dependencias del Back-end

```bash
cd backend

npm install
```

---

## 4. Configurar variables de entorno

Crear el archivo `.env` con las credenciales de Supabase.

---

## 5. Ejecutar el Back-end

```bash
npm run dev
```

Servidor:

```
http://localhost:3000
```

---

## 6. Ejecutar el Front-end

Regresar a la carpeta principal

```bash
cd ..
```

Iniciar Expo

```bash
npx expo start
```

---

## 7. Ejecutar la aplicación

HabitQuest puede ejecutarse en:

- Android (Expo Go)
- Emulador Android
- Navegador Web

---

# 📂 Arquitectura del Proyecto

## Front-end

```text
src/
│
├── assets/
├── components/
│   ├── auth/
│   ├── common/
│   ├── habits/
│   ├── home/
│   ├── profile/
│   ├── rewards/
│   ├── settings/
│   └── stats/
│
├── context/
├── hooks/
├── navigation/
├── screens/
│   ├── auth/
│   ├── habits/
│   ├── home/
│   ├── profile/
│   ├── rewards/
│   ├── settings/
│   └── stats/
│
├── services/
└── styles/
```

---

## Back-end

```text
backend/
│
├── src/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
│
├── app.js
└── server.js
```

La arquitectura sigue una separación por capas:

- Configuración
- Controladores
- Middleware
- Modelos
- Servicios
- Rutas

La persistencia de la información se realiza mediante **Supabase PostgreSQL**, mientras que las fotografías de perfil son almacenadas mediante **Supabase Storage**.

---

# 🌐 API REST

## 🔐 Autenticación

```http
POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

PUT /api/auth/profile
```

---

## ✅ Hábitos

```http
GET /api/habits

POST /api/habits

PUT /api/habits/:id

DELETE /api/habits/:id

PATCH /api/habits/:id/toggle

POST /api/habits/reset
```

---

## ⚙️ Configuración

```http
GET /api/settings

PUT /api/settings
```

---

## 💬 Frases Motivacionales

```http
GET /api/quotes/random
```

---

## 📷 Imágenes

```http
POST /api/upload/profile-image
```

# 📱 Funcionalidades Nativas

HabitQuest integra diversas capacidades propias del dispositivo móvil mediante Expo.

## 📷 Cámara

- Captura fotografías para el perfil del usuario.
- Solicitud dinámica de permisos.

---

## 🖼️ Galería

- Selección de imágenes almacenadas en el dispositivo.
- Actualización inmediata del perfil.

---

## 📍 Ubicación

- Obtención de coordenadas mediante GPS.
- Conversión automática a dirección.
- Asociación de la ubicación al perfil del usuario.

---

## 🔔 Notificaciones

- Programación de recordatorios diarios.
- Solicitud dinámica de permisos.
- Configuración desde la aplicación.

---

# 🔒 Seguridad

HabitQuest implementa diferentes mecanismos de seguridad:

- Autenticación mediante JWT.
- Protección de rutas privadas.
- Middleware de validación de token.
- Contraseñas cifradas mediante bcrypt.
- Validaciones de formularios.
- Manejo centralizado de errores.
- Comunicación segura entre cliente y servidor.
- Persistencia segura mediante Supabase.

---

# 🎨 Interfaz de Usuario (UI/UX)

La aplicación fue diseñada siguiendo principios de usabilidad y experiencia de usuario.

Características implementadas:

- Diseño moderno.
- Componentes reutilizables.
- Navegación intuitiva.
- Colores consistentes.
- Diseño responsive.
- Modo claro.
- Modo oscuro.
- Alertas personalizadas.
- Iconografía uniforme.
- Tarjetas informativas.

---

# 🔄 Flujo de Navegación

La navegación fue implementada utilizando **React Navigation**.

## Stack Navigation

- Login
- Registro

Después de iniciar sesión el usuario accede automáticamente al módulo principal.

## Bottom Tab Navigation

- Inicio
- Estadísticas
- Recompensas
- Perfil

Además, la aplicación incorpora navegación adicional hacia:

- Crear hábito.
- Editar hábito.
- Editar perfil.
- Configuración.

---

# 🧩 Componentes Reutilizables

Durante el desarrollo se implementaron diversos componentes reutilizables para facilitar el mantenimiento del proyecto.

Entre ellos destacan:

- MainButton
- CustomAlert
- AppHeader
- Card
- InfoBox
- HabitCard
- HabitPreviewCard
- FrequencySelector
- StatsCard
- RewardCard
- HomeHeader
- QuoteBanner
- FloatingAddButton
- ProfileHeader
- ProfileStats
- ProfileMenu
- EditProfileForm
- SettingsSwitchCard
- SettingsInfoCard
- SettingsSimulationCard
- SettingsResetCard
- AuthContainer
- AuthHeader
- AuthInput
- AuthFooterLink

---

# ☁️ Persistencia de Datos

La aplicación utiliza una arquitectura Cliente–Servidor.

Toda la información es almacenada mediante:

- Supabase PostgreSQL
- Supabase Storage

Información persistida:

- Usuarios.
- Hábitos.
- Configuración.
- Progreso.
- Frases motivacionales.
- Fotografías de perfil.

---

# 💡 Innovaciones Implementadas

Respecto al avance inicial del proyecto se incorporaron las siguientes mejoras:

- Arquitectura Cliente–Servidor.
- API REST propia.
- Integración con Supabase.
- Persistencia mediante PostgreSQL.
- Almacenamiento de imágenes mediante Supabase Storage.
- Autenticación JWT.
- Protección de rutas privadas.
- Gestión profesional por capas.
- Consumo de API mediante Axios.
- Context API para estados globales.
- Hooks personalizados.
- Modo oscuro dinámico.
- Fotografía mediante cámara y galería.
- Ubicación GPS.
- Notificaciones locales.
- Frases motivacionales dinámicas.
- Componentización avanzada.
- Arquitectura modular y escalable.
- DDespliegue del backend en la nube (Render).
- Generación de builds nativos multiplataforma con EAS Build (APK instalable para Android).
- Gestión segura de variables de entorno y credenciales mediante archivos ".env" excluidos del control de versiones.

---

# 📸 Capturas de Pantalla

Se recomienda incluir imágenes de:

- Pantalla de Inicio.
- Login.
- Registro.
- Crear Hábito.
- Editar Hábito.
- Estadísticas.
- Recompensas.
- Perfil.
- Configuración.
- Modo Oscuro.

---

# 🚀 Próximas Mejoras

- Inicio de sesión con Google.
- Recuperación de contraseña mediante correo electrónico.
- Sincronización en tiempo real.
- Recordatorios inteligentes.
- Compartir logros.
- Ranking entre usuarios.
- Desafíos semanales.
- Panel administrativo web.
- Publicación en Google Play Store.

---

# 📈 Estado del Proyecto

✅ Proyecto Finalizado

El proyecto implementa satisfactoriamente:

- Arquitectura Cliente–Servidor.
- React Native + Expo.
- Node.js + Express.
- API REST.
- Supabase PostgreSQL.
- Supabase Storage.
- JWT.
- Context API.
- React Navigation.
- Funcionalidades nativas.
- Componentes reutilizables.
- Arquitectura modular.

---

# 👨‍💻 Autores

**Oliver Saúl Huamaní Tapara**

**Dylan Sebastián Ayala Vivanco**

Universidad Tecnológica del Perú

Ingeniería de Software

2026

---

# 📄 Licencia

Proyecto desarrollado con fines académicos para el curso de **Desarrollo de Aplicaciones Móviles** de la **Universidad Tecnológica del Perú (UTP)**.