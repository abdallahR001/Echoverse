import { generateEmbedding } from "./src/services/embeddingService.js"
import { addUniverseInfo, searchUniverseInfo } from "./src/repositories/universe.repository.js"


const universeId = "981ffab1-5b72-4a3f-82d9-c08251308d7c";


const content = 
"the king hated tomatoes";


const embedding = await generateEmbedding(content);


const info = await addUniverseInfo({
  universeId,
  content,
  embedding
});


console.log(info);

const question = "hi";


const questionEmbedding = await generateEmbedding(question);


const results = await searchUniverseInfo({
  universeId,
  embedding: questionEmbedding
});


console.log("\nSearch Results:");
console.log(results);