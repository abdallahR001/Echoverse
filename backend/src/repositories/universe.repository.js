import prisma from "../config/prisma.js"

export const createUniverse = async ({universeCode,description,lore}) =>
{
    return await prisma.universe.create({
        data:{
            description,
            lore,
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
  limit = 5,
  threshold = 0.75
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


  return results.filter(
    item => Number(item.similarity) >= threshold
  );
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
    }
  })
}