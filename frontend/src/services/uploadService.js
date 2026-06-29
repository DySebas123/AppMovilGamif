import api from "./api";
import { Platform } from "react-native";

export const uploadProfileImage = async (imageUri, token) => {
    const formData = new FormData();

    if (Platform.OS === "web") {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const file = new File(
            [blob],
            `profile_${Date.now()}.jpg`,
            {
                type: blob.type || "image/jpeg",
            }
        );

        formData.append("image", file);
    } else {
        const fileName =
            imageUri.split("/").pop() || `profile_${Date.now()}.jpg`;

        const extension =
            fileName.split(".").pop() || "jpg";

        formData.append("image", {
            uri: imageUri,
            name: fileName,
            type: `image/${extension}`,
        });
    }

    return api.post("/upload/profile-image", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};