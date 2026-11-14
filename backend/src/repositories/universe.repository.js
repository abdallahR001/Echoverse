import prisma from "../config/prisma.js"

export const createUniverse = async ({universeCode,name,description}) =>
{
    return await prisma.universe.create({
        data:{
            name,
            description,
            universeCode,
        }
    })
}

export const deleteUniverse = async (universeId) =>
{
  return await prisma.universe.delete(
    {
      where:{
        id:universeId
      }
    }
  )
}

export const getUniverseById = async (universeId) =>
{
    return await prisma.universe.findUnique({
        where:{
            id:universeId
        }
    })
}

export const updateUniverse = async ({
  universeId,
  name,
  description,
  image
}) => {
  return await prisma.universe.update({
    where: {
      id: universeId
    },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image })
    }
  })
}

export const getUniverses = async() =>
{
  return await prisma.universe.findMany()
}

export async function addUniverseInfo({
  universeId,
  content,
  embedding
}) {

  const vector = `[${embedding.join(",")}]`;


  const result = await prisma.$queryRaw`
    INSERT INTO "UniverseInfo"
    (
      id,
      "universeId",
      content,
      embedding,
      created_at
    )
    VALUES
    (
      gen_random_uuid(),
      ${universeId},
      ${content},
      ${vector}::vector,
      NOW()
    )
    RETURNING
      id,
      "universeId",
      content,
      created_at;
  `;


  return result[0];
}

export async function searchUniverseInfo({
  universeId,
  embedding,
  limit = 3,
}) {

  const vector = `[${embedding.join(",")}]`;


  const results = await prisma.$queryRaw`
    SELECT
      id,
      content,
      1 - (embedding <=> ${vector}::vector) AS similarity
    FROM "UniverseInfo"
    WHERE "universeId" = ${universeId}
    ORDER BY embedding <=> ${vector}::vector
    LIMIT ${limit};
  `;


  return results
}

export const createUserUniverse = async({userId,universeId}) =>
{
  return await prisma.userUniverse.create({
    data:{
      userId,
      universeId
    }
  })
}

export const getUserUniverse = async({userId,universeId}) =>
{
  return await prisma.userUniverse.findFirst({
    where:{
      userId,
      universeId,
      status:"ACTIVE"
    },
    include:{
      universe:true,
      messages:
      {
        orderBy:{
          created_at:"desc"
        },
        take:10
      },
    }
  })
}

// export const lockLastActiveUserUniverse = async ({ userId }) => {
//     return await prisma.$transaction(async (tx) => {

//         const lastActive = await tx.userUniverse.findFirst({
//             where: {
//                 userId,
//                 status: "ACTIVE"
//             },
//             orderBy: {
//                 created_at: "desc"
//             }
//         })

//         if (!lastActive) {
//             return null
//         }

//         return await tx.userUniverse.update({
//             where: {
//                 userId_universeId: {
//                     userId,
//                     universeId: lastActive.universeId
//                 }
//             },
//             data: {
//                 status: "DORMANT"
//             }
//         })
//     })
// }

export const enterUniverse = async ({ userId, universeId }) => {
  return await prisma.$transaction(async (tx) => {

    const lastActive = await tx.userUniverse.findFirst({
      where: {
        userId,
        status: "ACTIVE"
      },
      orderBy: {
        created_at: "desc"
      }
    })

    if (lastActive) {
      await tx.userUniverse.update({
        where: {
          id: lastActive.id
        },
        data: {
          status: "DORMANT"
        }
      })
    }

    return await tx.userUniverse.create({
      data: {
        userId,
        universeId
      }
    })
  })
}