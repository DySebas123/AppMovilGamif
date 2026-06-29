const uploadProfileImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No se recibió ninguna imagen.",
            });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        return res.status(200).json({
            success: true,
            message: "Imagen subida correctamente.",
            imageUrl,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al subir imagen.",
        });
    }
};

module.exports = {
    uploadProfileImage,
};