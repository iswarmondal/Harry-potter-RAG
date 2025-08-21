import { createAppRouter, type AskInput } from "@harry-potter-rag/trpc-shared";
import { ask } from "./rag";

export const appRouter = createAppRouter({
  askHandler: async ({ prompt, topK }: AskInput) => ask(prompt, topK),
});

export type AppRouter = typeof appRouter;
