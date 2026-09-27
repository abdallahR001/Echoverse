import * as objectiveRepository from "../repositories/objective.repository.js";

const createObjective = async ({ userId, universeId, title }) => {
    const activeObjective =
        await objectiveRepository.getActiveObjective({
            userId,
            universeId,
        });

    if (activeObjective) {
        return activeObjective;
    }

    return await objectiveRepository.createObjective({
        userId,
        universeId,
        title,
    });
};

const getActiveObjective = async ({ userId, universeId }) => {
    return await objectiveRepository.getActiveObjective({
        userId,
        universeId,
    });
};

const getAllObjectives = async ({ userId, universeId }) => {
    return await objectiveRepository.getAllObjectives({
        userId,
        universeId,
    });
};

const updateObjectiveStatus = async ({
    userId,
    universeId,
    objectiveId,
    status,
}) => {
    const objective =
        await objectiveRepository.getActiveObjective({
            userId,
            universeId,
        });

    if (!objective || objective.id !== objectiveId) {
        throw new Error("Active objective not found");
    }

    return await objectiveRepository.updateObjectiveStatus({
        objectiveId,
        status,
    });
};

const cancelObjective = async ({
    userId,
    universeId,
    objectiveId,
}) => {
    return await updateObjectiveStatus({
        userId,
        universeId,
        objectiveId,
        status: "DISMISSED",
    });
};

export {
    createObjective,
    getActiveObjective,
    getAllObjectives,
    updateObjectiveStatus,
    cancelObjective,
};