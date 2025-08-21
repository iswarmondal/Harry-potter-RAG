import { initTRPC } from "@trpc/server";
import { z } from "zod";

export const t = initTRPC.create();

export const askInputSchema = z.object({
  prompt: z.string(),
  topK: z.number().int().min(1).max(20).optional(),
});
export type AskInput = z.infer<typeof askInputSchema>;

export function createAppRouter(opts: {
  askHandler: (args: AskInput) => Promise<{
    answer: string;
    sources: Array<{ id: string; score: number; text?: string }>;
  }>;
}) {
  const { askHandler } = opts;

  const appRouter = t.router({
    ask: t.procedure.input(askInputSchema).mutation(async ({ input }) => {
      return askHandler(input);
    }),
  });

  return appRouter;
}

export type AppRouter = ReturnType<typeof createAppRouter>;
export type AskOutput = {
  answer: string;
  sources: Array<{ id: string; score: number; text?: string }>;
};
