import api from "./api";

export const register = (data) => {
    return api.post("/auth/register", data);
};

export const login = (data) => {
    return api.post("/auth/login", data);
};

export const getProfile = (token) => {
    return api.get("/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateProfile = (data, token) => {
    return api.put("/auth/profile", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

