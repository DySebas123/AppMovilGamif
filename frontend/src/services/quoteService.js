import api from "./api";

export const getRandomQuote = async () => {
    const response = await api.get("/quotes/random");
    return response.data.quote;
};