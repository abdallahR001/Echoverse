import { createStartingMessage } from "../repositories/message.repository.js";
import * as universeRepository from "../repositories/universe.repository.js";
import { generateEmbedding } from "../services/embeddingService.js";
import { generateStartingMessage } from "../utils/generateStartingMessage.js";
import { generateUniverseCode } from "../utils/generateUniverseCode.js";

export const createUniverse = async (req, res) => {
    try {
        const {description} = req.body

        const universeCode = generateUniverseCode();

        const universe = await universeRepository.createUniverse({
            universeCode,
            description,
            lore
        });

        return res.status(201).json({
            success: true,
            universe,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create universe."
        });
    }
};

export const addUniverseInfo = async (req,res,next) =>
{
    const {universeId,info} = req.body

    try {
        const universe = await universeRepository.getUniverseById(universeId)

        if(!universe)
        {
            return res.status(404).json(
                {
                    message:"universe not found."
                }
            )
        }

        const infoEmbedding = await generateEmbedding(info)

        const result = await universeRepository.addUniverseInfo(
            {
                content:info,
                universeId,
                embedding:infoEmbedding
            }
        )

        return res.status(201).json(
            {
                message:"information added successfully",
                info:result
            }
        )
    } catch (error) {
        console.log(error)

        next(error)
    }
}

export const createUserUniverse = async (req,res,next) =>
{
    try {

        const userId = req.user.id

        const {universeId} = req.params

        const universe = await universeRepository.getUniverseById(universeId)

        if(!universe)
        {
            return res.status(404).json(
                {
                    message:"universe not found."
                }
            )
        }

        const existingUserUniverse = await universeRepository.getUserUniverse({userId,universeId})

        if(existingUserUniverse)
        {
            const error = new Error("universe already entered")
            error.status = 400

            throw error
        }

        const userUniverse = await universeRepository.createUserUniverse({userId,universeId})

        const startingMessage = await generateStartingMessage({
            description: universe.description,
            lore: universe.lore
        });

        await createStartingMessage(
            {
                userUniverseId:userUniverse.id,
                content:startingMessage.startingMessage,
                senderRole:"AI"
            }
        )


        return res.status(201).json(
            {
                message:"entered universe successfully",
                userUniverse,
                startingMessage,
            }
        )
    } catch (error) {
        console.log(error)

        next(error)
    }
}

export const getUniverses = async (req,res,next) =>
{
    try {
        const universes = await universeRepository.getUniverses()

        return res.json(
            {
                universes
            }
        )
    } catch (error) {
        console.log(error)

        next(error)
    }
}