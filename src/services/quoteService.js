import quotes from "../data/motivationalQuotes.json";

export const getRandomQuote = () => {

    const randomIndex = Math.floor(
        Math.random() * quotes.length
    );

    return quotes[randomIndex];
};