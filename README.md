# HabitQuest 📱✨

Aplicación móvil desarrollada con **React Native + Expo** para la gestión inteligente de hábitos, incorporando gamificación, autenticación segura mediante JWT, consumo de API REST y funcionalidades nativas del dispositivo.

---

# 📌 Descripción del Proyecto

HabitQuest es una aplicación móvil diseñada para ayudar a los usuarios a desarrollar hábitos saludables mediante un sistema de gamificación que incentiva la constancia y el progreso personal.

La aplicación permite administrar hábitos diarios, visualizar estadísticas, obtener recompensas, personalizar el perfil del usuario y utilizar funcionalidades nativas como cámara, galería, GPS y notificaciones.

---

# 🎯 Objetivos del Proyecto

Desarrollar una aplicación móvil moderna aplicando buenas prácticas de Ingeniería de Software mediante:

* Arquitectura modular y escalable.
* Componentización reutilizable.
* Navegación mediante React Navigation.
* Consumo de API REST propia.
* Autenticación mediante JWT.
* Integración de funcionalidades nativas.
* Persistencia de información en Back-end.
* Interfaz moderna y responsive.

---

# 🚀 Funcionalidades Implementadas

## Autenticación

* Registro de usuarios.
* Inicio de sesión.
* Autenticación mediante JWT.
* Validación de token.
* Cierre de sesión.

---

## Gestión de Perfil

* Edición de nombre.
* Edición de correo.
* Cambio de foto de perfil.
* Captura desde cámara.
* Selección desde galería.
* Obtención de ubicación mediante GPS.
* Persistencia de perfil en Back-end.

---

## Gestión de Hábitos

* Crear hábitos.
* Editar hábitos.
* Eliminar hábitos.
* Marcar hábitos completados.
* Gestión automática de rachas.
* Sistema de XP.
* Sistema de niveles.
* Progreso diario.

---

## Estadísticas

* XP acumulado.
* Nivel alcanzado.
* Hábitos completados.
* Mejor racha.
* Total de hábitos.

---

## Sistema de Recompensas

* Logros desbloqueables.
* Progreso gamificado.
* Sistema de experiencia.

---

## Configuración

* Tema claro.
* Tema oscuro.
* Activación de notificaciones.
* Simulación de días.
* Reinicio de progreso.
* Configuración sincronizada con Back-end.

---

## Frases Motivacionales

* Obtención dinámica desde el Back-end.
* Selección aleatoria.
* Consumo mediante API REST.

---

# 🛠 Tecnologías Utilizadas

## Front-end

* React Native
* Expo
* JavaScript (ES6+)
* React Navigation
* Context API
* Axios
* Expo Image Picker
* Expo Location
* Expo Notifications
* Expo Linear Gradient
* Expo Vector Icons

---

## Back-end

* Node.js
* Express
* JWT (jsonwebtoken)
* bcryptjs
* Multer
* CORS
* dotenv

---

## Persistencia

Durante esta etapa académica la aplicación utiliza archivos JSON como almacenamiento local del servidor.

Archivos principales:

* users.json
* habits.json
* progress.json
* settings.json
* motivationalQuotes.json

La arquitectura fue diseñada para permitir una futura migración a MySQL sin modificar la lógica de negocio.

---

# 📂 Arquitectura del Proyecto

## Front-end

```text
src/
│
├── components/
│
├── context/
│
├── navigation/
│
├── screens/
│
├── services/
│
├── styles/
│
├── hooks/
│
├── utils/
│
└── assets/
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
├── utils/
├── data/
├── uploads/
│
├── app.js
└── server.js
```

La arquitectura sigue una separación por capas:

* Configuración
* Controladores
* Servicios
* Modelos
* Rutas
* Utilidades

lo que facilita el mantenimiento y escalabilidad del proyecto.

---

# 🌐 API REST Implementada

## Autenticación

POST

```
/api/auth/register
```

POST

```
/api/auth/login
```

GET

```
/api/auth/profile
```

PUT

```
/api/auth/profile
```

---

## Hábitos

GET

```
/api/habits
```

POST

```
/api/habits
```

PUT

```
/api/habits/:id
```

DELETE

```
/api/habits/:id
```

---

## Configuración

GET

```
/api/settings
```

PUT

```
/api/settings
```

---

## Frases Motivacionales

GET

```
/api/quotes/random
```

---

## Subida de Imágenes

POST

```
/api/upload/profile-image
```

---

# 📱 Funcionalidades Nativas

La aplicación utiliza diferentes capacidades del dispositivo:

* Cámara.
* Galería de imágenes.
* Ubicación GPS.
* Notificaciones locales.
* Permisos dinámicos.

---

# 🔒 Seguridad

La aplicación implementa:

* JWT para autenticación.
* Middleware de validación de token.
* Encriptación de contraseñas mediante bcrypt.
* Validaciones de formularios.
* Manejo centralizado de errores.
* Protección de rutas privadas.

---

# 💡 Innovaciones Implementadas

Respecto al avance anterior se añadieron:

* Arquitectura completa Cliente–Servidor.
* API REST propia.
* Persistencia centralizada.
* Autenticación JWT.
* Gestión profesional por capas.
* Cambio de foto mediante cámara y galería.
* Ubicación del usuario.
* Configuración sincronizada con Back-end.
* Modo oscuro dinámico.
* Frases motivacionales consumidas desde la API.
* Componentización avanzada.
* Separación de lógica de negocio mediante Services.

---

# 📦 Instalación

## Front-end

```bash
npm install
```

```bash
npx expo start
```

---

## Back-end

```bash
cd backend
```

```bash
npm install
```

```bash
npm start
```

Servidor:

```
http://localhost:3000
```

---

# 👨‍💻 Autores

**Oliver Saúl Huamaní Tapara**

**Dylan Sebastián Ayala Vivanco**

Universidad Tecnológica del Perú

Ingeniería de Software

2026
