import { searchUniverseInfo } from "../repositories/universe.repository.js";

export const getRelevantUniverseInfo = async ({
  universeId,
  messageEmbedding,
  limit = 3,
}) => {
  const results = await searchUniverseInfo({
    universeId,
    embedding: messageEmbedding,
    limit,
  });

  return results;
};