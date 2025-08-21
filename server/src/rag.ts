import { Settings } from "llamaindex";
import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { QdrantClient } from "@qdrant/js-client-rest";

function configureLlamaIndex(): void {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  // Configure LLM and embedding model to match persisted embeddings
  Settings.llm = new OpenAI({
    apiKey,
    model: "gpt-5-nano",
    temperature: 1,
  });
  Settings.embedModel = new OpenAIEmbedding({
    apiKey,
    // Match the Python notebook if possible
    model: "text-embedding-ada-002",
  });
}

function getQdrantClient(): { client: QdrantClient; collection: string } {
  const qdrantUrl = process.env.QDRANT_INSTANCE_URL;
  const qdrantApiKey = process.env.QDRANT_API_KEY;
  const qdrantCollection = process.env.QDRANT_COLLECTION;
  if (!qdrantUrl)
    throw new Error("QDRANT_INSTANCE_URL is not set in environment");
  if (!qdrantCollection)
    throw new Error("QDRANT_COLLECTION is not set in environment");
  const client = new QdrantClient({ url: qdrantUrl, apiKey: qdrantApiKey });
  return { client, collection: qdrantCollection };
}

export async function ask(
  question: string,
  topK = 4
): Promise<{
  answer: string;
  sources: Array<{ id: string; score: number; text?: string }>;
}> {
  configureLlamaIndex();
  const { client, collection } = getQdrantClient();
  const embedModel = Settings.embedModel as unknown as OpenAIEmbedding;
  const queryEmbedding = await embedModel.getTextEmbedding(question);
  const result = await client.query(collection, {
    query: queryEmbedding,
    limit: topK,
    with_payload: true,
    with_vector: false,
  });
  const sources = (result?.points ?? []).map((p: any) => {
    const payload = p?.payload ?? {};
    const text =
      payload.text ??
      payload.content ??
      payload.page_content ??
      payload.body ??
      (typeof payload === "object" && payload !== null
        ? (payload as any)["_node_content"]
        : undefined);
    return {
      id: String(p?.id ?? ""),
      score: Number(p?.score ?? 0),
      text: typeof text === "string" ? text : undefined,
    };
  });
  const context = sources
    .filter((s) => typeof s.text === "string" && s.text.length > 0)
    .map((s, i) => `Source ${i + 1}:\n${s.text}`)
    .join("\n\n");
  const prompt = `You are a helpful assistant. Use the provided context to answer the user's question. If the answer is not in the context, say you don't know.

Question: ${question}

Context:
${context}`;
  const chatRes: any = await (Settings.llm as any).chat({
    messages: [{ role: "user", content: prompt }],
  });
  const answer = (chatRes as any)?.message?.content ?? String(chatRes ?? "");
  return { answer, sources };
}

//
