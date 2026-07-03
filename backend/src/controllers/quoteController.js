const quoteService = require("../services/quoteService");

const getRandomQuote = async (req, res) => {
    try {
        const result = await quoteService.getRandomQuote();

        return res.status(result.status).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error interno al obtener frase.",
        });
    }
};

module.exports = {
    getRandomQuote,
};