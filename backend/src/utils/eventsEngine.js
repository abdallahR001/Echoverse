export const generateEvent = () => {
    const random = Math.floor(Math.random() * 100) + 1;

    if (random <= 2) return "GLITCH";          // 2%
    if (random <= 6) return "NEW_CHARACTER";   // 4%
    if (random <= 10) return "SIGNAL";         // 4%

    return null; // 90%
};