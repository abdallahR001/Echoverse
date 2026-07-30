export const generateEvent = () => {
    const random = Math.floor(Math.random() * 25) + 1;

    if (random <= 5) return "GLITCH";
    if (random <= 15) return "NEW_CHARACTER";
    if (random <= 25) return "SIGNAL";

    return "RANDOM";
};