import api from "./api";

export const getSettings = (token) => {
    return api.get("/settings", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateSettings = (settings, token) => {
    return api.put("/settings", settings, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};