const path = require("path");
const supabase = require("../config/supabaseClient");

const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No se recibió ninguna imagen.",
            });
        }

        const extension =
            path.extname(req.file.originalname) || ".jpg";

        const fileName =
            `profile_${req.user.id}_${Date.now()}${extension}`;

        const filePath =
            `profiles/${fileName}`;

        const { error } = await supabase.storage
            .from("profile-images")
            .upload(filePath, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: true,
            });

        if (error) {
            console.log("Error Supabase Storage:", error.message);

            return res.status(500).json({
                success: false,
                message: "Error al subir imagen a Supabase Storage.",
            });
        }

        const { data } = supabase.storage
            .from("profile-images")
            .getPublicUrl(filePath);

        return res.status(200).json({
            success: true,
            message: "Imagen subida correctamente.",
            imageUrl: data.publicUrl,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error interno al subir imagen.",
        });
    }
};

module.exports = {
    uploadProfileImage,
};