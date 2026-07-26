import prisma from "../config/prisma.js"
export const createUniverse = async ({universeCode,description,userId}) =>
{
    return await prisma.universe.create({
        data:{
            universeCode,
            description,
            userId,
        }
    })
}