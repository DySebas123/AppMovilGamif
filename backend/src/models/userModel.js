const {
    getDataPath,
    readJsonFile,
    writeJsonFile,
} = require("../utils/fileStorage");

const usersPath = getDataPath("users.json");

const getAllUsers = () => {
    return readJsonFile(usersPath);
};

const saveAllUsers = (users) => {
    writeJsonFile(usersPath, users);
};

const findUserByEmail = (email) => {
    const users = getAllUsers();

    return users.find(
        user => user.email === email.toLowerCase().trim()
    );
};

const findUserById = (id) => {
    const users = getAllUsers();

    return users.find(
        user => user.id === id
    );
};

const createUser = (userData) => {
    const users = getAllUsers();

    const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profileImage: null,
        location: null,
        settings: {
            darkMode: false,
            notifications: true,
        },
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    saveAllUsers(users);

    return newUser;
};

const updateUserProfile = (id, data) => {
    const users = getAllUsers();

    const userIndex = users.findIndex(
        user => user.id === id
    );

    if (userIndex === -1) {
        return null;
    }

    users[userIndex] = {
        ...users[userIndex],
        name: data.name,
        email: data.email,

        profileImage:
            data.profileImage !== undefined
                ? data.profileImage
                : users[userIndex].profileImage || null,

        location:
            data.location !== undefined
                ? data.location
                : users[userIndex].location || null,

        updatedAt: new Date().toISOString(),
    };

    saveAllUsers(users);

    return users[userIndex];
};

const emailExistsForAnotherUser = (email, userId) => {
    const users = getAllUsers();

    return users.find(
        user =>
            user.email === email.toLowerCase().trim() &&
            user.id !== userId
    );
};

const updateUserSettings = (id, settings) => {
    const users = getAllUsers();

    const userIndex = users.findIndex(
        user => user.id === id
    );

    if (userIndex === -1) {
        return null;
    }

    users[userIndex] = {
        ...users[userIndex],
        settings: {
            darkMode: settings.darkMode,
            notifications: settings.notifications,
        },
        updatedAt: new Date().toISOString(),
    };

    saveAllUsers(users);

    return users[userIndex];
};

module.exports = {
    getAllUsers,
    saveAllUsers,
    findUserByEmail,
    findUserById,
    createUser,
    updateUserProfile,
    emailExistsForAnotherUser,
    updateUserSettings
};