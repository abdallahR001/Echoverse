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

        if(!userId)
        {
            const error = new Error("unauthorized")
            error.status = 401

            throw error
        }

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

        // here we check if the user has already entered this universe, if yes, we don't allow it

        // const existingUserUniverse = await universeRepository.getUserUniverse({userId,universeId})

        // if(existingUserUniverse)
        // {
        //     const error = new Error("universe already entered")
        //     error.status = 400

        //     throw error
        // }

        // now we should lock the last active user universe universe

        const userUniverse = await universeRepository.enterUniverse({
            userId,
            universeId
        })

        const startingMessage = await generateStartingMessage({
            description: universe.description,
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

export const getUserUniverse = async (req,res,next) =>
{
    try {
        const {universeId} = req.query

        console.log(universeId);
        

        const {id} = req.user

        const universe = await universeRepository.getUserUniverse({userId:id,universeId})

        if(!universe)
        {
            const error = new Error("universe not found")
            error.status = 404

            throw error
        }

        if(universe?.messages)
            universe.messages.reverse()

        console.log(
  universe.messages.map(m => ({
    role: m.senderRole,
    content: m.content
  }))
);

        return res.json(universe)
    } catch (error) {
        console.log(error)

        next(error)
    }
}


export const updateUniverse = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error("unauthorized");
      error.status = 401;
      throw error;
    }

    const result = updateUniverseSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request data.",
        errors: result.error.flatten(),
      });
    }

    const { universeId, name, description, image } = result.data;

    const universe = await universeRepository.getUniverseById(universeId);

    if (!universe) {
      return res.status(404).json({
        message: "Universe not found."
      });
    }

    const updatedUniverse = await universeRepository.updateUniverse({
      universeId,
      name,
      description,
      image,
    });

    return res.json({
      message: "Universe updated successfully.",
      universe: updatedUniverse,
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};