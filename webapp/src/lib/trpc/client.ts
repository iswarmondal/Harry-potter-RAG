import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@harry-potter-rag/trpc-shared';

function normalizeTrpcUrl(url?: string): string | undefined {
	if (!url) return undefined;
	let normalized = url.trim();
	if (normalized.endsWith('/')) normalized = normalized.slice(0, -1);
	if (!normalized.endsWith('/trpc')) normalized = `${normalized}/trpc`;
	return normalized;
}

const envUrl =
	(import.meta.env.VITE_TRPC_URL as string | undefined) ||
	(import.meta as any).env?.PUBLIC_TRPC_URL;
const TRPC_URL =
	normalizeTrpcUrl(envUrl) ??
	(typeof window !== 'undefined' ? normalizeTrpcUrl(window.location.origin) : undefined) ??
	'/trpc';

export const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: TRPC_URL
		})
	]
});
