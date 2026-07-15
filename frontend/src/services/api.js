import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

const API_URL = "https://habitquest-backend-9ehq.onrender.com/api";

const getBaseURL = () => {

    if (!__DEV__) {
        return API_URL;
    }

    if (Platform.OS === "web") {
        return "http://localhost:3000/api";
    }

    const hostUri = Constants.expoConfig?.hostUri;
    const host = hostUri ? hostUri.split(":")[0] : null;

    if (host) {
        return `http://${host}:3000/api`;
    }

    if (Platform.OS === "android") {
        return "http://10.0.2.2:3000/api";
    }
    return "http://localhost:3000/api";
};

const api = axios.create({
    baseURL: getBaseURL(),
});

export default api;