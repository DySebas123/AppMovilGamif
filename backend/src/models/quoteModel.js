const supabase = require("../config/supabaseClient");

const mapQuoteFromDB = (quote) => {
    if (!quote) return null;

    return {
        id: quote.id,
        text: quote.text,
    };
};

const getAllQuotes = async () => {
    const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.log("Error getAllQuotes:", error.message);
        return [];
    }

    return data.map(mapQuoteFromDB);
};

const getRandomQuote = async () => {
    const quotes = await getAllQuotes();

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