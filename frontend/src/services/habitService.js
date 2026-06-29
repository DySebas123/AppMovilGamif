import api from "./api";

export const getHabits = (token) => {
    return api.get("/habits", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createHabit = (data, token) => {
    return api.post("/habits", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateHabit = (id, data, token) => {
    return api.put(`/habits/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteHabit = (id, token) => {
    return api.delete(`/habits/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const toggleHabit = (id, data, token) => {
    return api.patch(`/habits/${id}/toggle`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const resetHabits = (token) => {
    return api.delete("/habits/reset/all", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};