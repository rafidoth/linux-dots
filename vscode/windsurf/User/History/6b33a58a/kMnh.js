import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { getTranscript } from "../controllers/codingProblemsController";

const embeddingModel = openai.embedding("text-embedding-ada-002");

const generateChunks = (input) => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (value) => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const findTopMatches = async (query, topK = 4) => {
  const queryEmbedding = await generateEmbeddings(query);
  const allChunks = await generateEmbeddings(getTranscript(2));

  const scoredChunks = allChunks.map((chunk) => ({
    ...chunk,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scoredChunks.sort((a, b) => b.similarity - a.similarity);

  return scoredChunks.slice(0, topK); // top K relevant chunks
};
