const quoteModel = require("../models/quoteModel");

const getRandomQuote = () => {
    const quote = quoteModel.getRandomQuote();

    if (!quote) {
        return {
            status: 404,
            success: false,
            message: "No hay frases disponibles.",
        };
    }

    return {
        status: 200,
        success: true,
        quote,
    };
};

module.exports = {
    getRandomQuote,
};