import { generateUniverse } from "../utils/ai.js";
import * as universeRepository from "../repositories/universe.repository.js";
import { generateUniverseCode } from "../utils/generateUniverseCode.js";

export const createUniverse = async (req, res) => {
    try {
        const universeData = await generateUniverse();

        const universeCode = generateUniverseCode();

        const universe = await universeRepository.createUniverse({
            universeCode,
            description: universeData.description,
            userId: req.user.id,
        });

        return res.status(201).json({
            success: true,
            universe,
            startingMessage:universeData.startingMessage
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create universe."
        });
    }
};