const quoteService = require("../services/quoteService");

const getRandomQuote = (req, res) => {
    try {
        const result = quoteService.getRandomQuote();

        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al obtener frase.",
        });
    }
};

module.exports = {
    getRandomQuote,
};