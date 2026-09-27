import prisma from "../config/prisma.js"

export const createUniverse = async ({universeCode,description}) =>
{
    return await prisma.universe.create({
        data:{
            description,
            universeCode,
        }
    })
}

export const getUniverseById = async (universeId) =>
{
    return await prisma.universe.findUnique({
        where:{
            id:universeId
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
  return await prisma.userUniverse.findUnique({
    where:{
      userId_universeId:
      {
        userId,universeId
      }
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

export const lockLastActiveUserUniverse = async ({ userId }) => {
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

        if (!lastActive) {
            return null
        }

        return await tx.userUniverse.update({
            where: {
                userId_universeId: {
                    userId,
                    universeId: lastActive.universeId
                }
            },
            data: {
                status: "DORMANT"
            }
        })
    })
}

