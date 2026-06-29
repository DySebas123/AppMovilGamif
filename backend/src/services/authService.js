const bcrypt = require("bcryptjs");

const userModel = require("../models/userModel");
const geocodingService = require("./geocodingService");

const {
    generateToken,
} = require("../config/jwt");

const formatUserResponse = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || null,
        location: user.location || null,
        settings: user.settings || {
            darkMode: false,
            notifications: true,
        },
    };
};

const registerUser = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        return {
            status: 400,
            success: false,
            message: "Todos los campos son obligatorios.",
        };
    }

    if (password.length < 8) {
        return {
            status: 400,
            success: false,
            message: "La contraseña debe tener mínimo 8 caracteres.",
        };
    }

    const userExists = userModel.findUserByEmail(email);

    if (userExists) {
        return {
            status: 409,
            success: false,
            message: "El correo ya está registrado.",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userModel.createUser({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
    });

    return {
        status: 201,
        success: true,
        message: "Usuario registrado correctamente.",
    };
};

const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        return {
            status: 400,
            success: false,
            message: "Correo y contraseña son obligatorios.",
        };
    }

    const user = userModel.findUserByEmail(email);

    if (!user) {
        return {
            status: 401,
            success: false,
            message: "Correo o contraseña incorrectos.",
        };
    }

    const passwordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordValid) {
        return {
            status: 401,
            success: false,
            message: "Correo o contraseña incorrectos.",
        };
    }

    const token = generateToken(user);

    return {
        status: 200,
        success: true,
        message: "Inicio de sesión exitoso.",
        token,
        user: formatUserResponse(user),
    };
};

const getUserProfile = (userId) => {
    const user = userModel.findUserById(userId);

    if (!user) {
        return {
            status: 404,
            success: false,
            message: "Usuario no encontrado.",
        };
    }

    return {
        status: 200,
        success: true,
        user: formatUserResponse(user),
    };
};

const updateUserProfile = async (userId, data) => {
    const {
        name,
        email,
        profileImage,
        location,
    } = data;

    if (!name || !email) {
        return {
            status: 400,
            success: false,
            message: "Nombre y correo son obligatorios.",
        };
    }

    const existingUser = userModel.findUserById(userId);

    if (!existingUser) {
        return {
            status: 404,
            success: false,
            message: "Usuario no encontrado.",
        };
    }

    const emailExists = userModel.emailExistsForAnotherUser(
        email,
        userId
    );

    if (emailExists) {
        return {
            status: 409,
            success: false,
            message: "El correo ya está registrado por otro usuario.",
        };
    }

    let finalLocation = location || existingUser.location || null;

    if (location?.latitude && location?.longitude) {
        const addressData =
            await geocodingService.getAddressFromCoordinates(
                location.latitude,
                location.longitude
            );

        finalLocation = {
            latitude: location.latitude,
            longitude: location.longitude,
            ...addressData,
        };
    }

    const updatedUser = userModel.updateUserProfile(
        userId,
        {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            profileImage,
            location: finalLocation,
        }
    );

    if (!updatedUser) {
        return {
            status: 404,
            success: false,
            message: "Usuario no encontrado.",
        };
    }

    return {
        status: 200,
        success: true,
        message: "Perfil actualizado correctamente.",
        user: formatUserResponse(updatedUser),
    };
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};