import prisma from "../config/prisma"

export const createObjective = async ({userId,universeId,title}) =>
{
    return await prisma.objective.create(
        {
            data:{
                userId,
                userUniverseId:universeId,
                title,
                status:"ACTIVE",
            }
        }
    )
}

export const getActiveObjective = async ({ userId, universeId }) => {
    return await prisma.objective.findFirst({
        where: {
            userId,
            userUniverseId: universeId,
            status: "ACTIVE",
        },
        select: {
            id: true,
            title: true,
            status: true,
            created_at: true,
        }
    })
}

export const getAllObjectives = async({userId,universeId}) =>
{
    return await prisma.objective.findMany(
        {
            where:{
                userId,
                userUniverseId:universeId
            },
            select:{
                id:true,
                status:true,
                title:true,
                created_at:true,
            }
        }
    )
}

export const cancelObjective = async({userId,universeId,objectiveId}) =>
{
    await prisma.objective.updateMany(
        {
            where:{
                id:objectiveId,
                status:"ACTIVE",
                userId,
                userUniverse:universeId
            },
            data:{
                status:"DISMISSED"
            }
        }
    )
}

export const updateObjectiveStatus = async ({ objectiveId, status }) => {
    return await prisma.objective.update({
        where: {
            id: objectiveId,
        },
        data: {
            status,
        },
    });
};