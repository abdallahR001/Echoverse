export const generateUniverseCode = () =>
    {
        const universeCode = `#${Math.floor(1000 + Math.random() * 9000)}`

        return universeCode
    };