const {
    getDataPath,
    readJsonFile,
} = require("../utils/fileStorage");

const quotesPath = getDataPath("quotes.json");

const getAllQuotes = () => {
    return readJsonFile(quotesPath);
};

const getRandomQuote = () => {
    const quotes = getAllQuotes();

    if (!quotes || quotes.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * quotes.length
    );

    return quotes[randomIndex];
};

module.exports = {
    getAllQuotes,
    getRandomQuote,
};