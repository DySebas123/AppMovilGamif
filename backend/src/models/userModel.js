const supabase = require("../config/supabaseClient");

const mapUserFromDB = (user) => {
    if (!user) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        profileImage: user.profile_image || null,
        location: user.location || null,
        settings: user.settings || {
            darkMode: false,
            notifications: true,
        },
        createdAt: user.created_at,
        updatedAt: user.updated_at,
    };
};

const findUserByEmail = async (email) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle();

    if (error) {
        console.log("Error findUserByEmail:", error.message);
        return null;
    }

    return mapUserFromDB(data);
};

const findUserById = async (id) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        console.log("Error findUserById:", error.message);
        return null;
    }

    return mapUserFromDB(data);
};

const createUser = async (userData) => {
    const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profile_image: null,
        location: null,
        settings: {
            darkMode: false,
            notifications: true,
            language: "Español",
        },
        created_at: new Date().toISOString(),
        updated_at: null,
    };

    const { data, error } = await supabase
        .from("users")
        .insert(newUser)
        .select()
        .single();

    if (error) {
        console.log("Error createUser:", error.message);
        throw error;
    }

    return mapUserFromDB(data);
};

const emailExistsForAnotherUser = async (email, userId) => {
    const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", email.toLowerCase().trim())
        .neq("id", userId)
        .maybeSingle();

    if (error) {
        console.log("Error emailExistsForAnotherUser:", error.message);
        return false;
    }

    return !!data;
};

const updateUserProfile = async (id, data) => {
    const updateData = {
        name: data.name,
        email: data.email,
        profile_image:
            data.profileImage !== undefined
                ? data.profileImage
                : null,
        location:
            data.location !== undefined
                ? data.location
                : null,
        updated_at: new Date().toISOString(),
    };

    const { data: updatedUser, error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.log("Error updateUserProfile:", error.message);
        return null;
    }

    return mapUserFromDB(updatedUser);
};

const updateUserSettings = async (id, settings) => {
    const updateData = {
        settings: {
            darkMode: settings.darkMode,
            notifications: settings.notifications,
            language: settings.language || "Español",
        },
        updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.log("Error updateUserSettings:", error.message);
        return null;
    }

    return mapUserFromDB(data);
};

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    updateUserProfile,
    emailExistsForAnotherUser,
    updateUserSettings,
};