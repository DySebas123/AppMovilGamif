import quotes from "../data/motivationalQuotes.json";

// Retorna un objeto de frase aleatoria desde el archivo estructurado JSON
export const getRandomQuote = () => {

    // Genera un indice entero pseudoaleatorio acotado por el tamaño del arreglo
    const randomIndex = Math.floor(
        Math.random() * quotes.length
    );

    return quotes[randomIndex];
};