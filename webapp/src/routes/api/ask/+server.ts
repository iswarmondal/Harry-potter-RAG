import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { ask } from '$lib/server/rag';

const askInputSchema = z.object({
	prompt: z.string(),
	topK: z.number().int().min(1).max(20).optional()
});

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	const parsed = askInputSchema.safeParse(body);
	if (!parsed.success) {
		return new Response(
			JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }),
			{ status: 400, headers: { 'content-type': 'application/json' } }
		);
	}

	const { prompt, topK } = parsed.data;
	try {
		const res = await ask(prompt, topK);
		return json(res);
	} catch (err: unknown) {
		console.error('/api/ask error', err);
		return new Response(
			JSON.stringify({ error: err instanceof Error ? err.message : 'Internal Server Error' }),
			{
				status: 500,
				headers: { 'content-type': 'application/json' }
			}
		);
	}
};
