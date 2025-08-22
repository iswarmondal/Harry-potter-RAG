<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger
	} from '$lib/components/ui/collapsible';
	import { ChevronDown } from '@lucide/svelte';
	type AskResult = { answer: string; sources: Array<{ id: string; score: number; text?: string }> };

	let question = $state('');
	let loading = $state(false);
	let answer = $state<string | null>(null);
	let sources = $state<Array<{ id: string; score: number; text?: string }>>([]);
	let errorMsg = $state<string | null>(null);
	let sourcesOpen = $state(false);

	async function onAsk() {
		errorMsg = null;
		answer = null;
		sources = [];
		const q = question.trim();
		if (!q) return;
		loading = true;
		try {
			const resp = await fetch('/api/ask', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ prompt: q, topK: 4 })
			});
			if (!resp.ok) {
				const err = await resp.json().catch(() => ({}));
				throw new Error(err?.error ?? 'Request failed');
			}
			const res: AskResult = await resp.json();
			answer = res?.answer ?? null;
			sources = res?.sources ?? [];
		} catch (err: any) {
			errorMsg = err?.message ?? 'Something went wrong';
		} finally {
			loading = false;
		}
	}

	function onSubmit(e: Event) {
		e.preventDefault();
		onAsk();
	}
</script>

<section
	class="mx-auto flex min-h-[60svh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 py-10"
>
	<header class="text-center">
		<h1 class="text-3xl font-semibold text-balance md:text-4xl">Ask the Harry Potter RAG</h1>
		<p class="mt-2 text-sm text-pretty text-muted-foreground md:text-base">
			Type a question and get an AI-generated answer grounded by knowledge base.
		</p>
	</header>

	<form class="flex w-full items-center gap-2" onsubmit={onSubmit}>
		<Input
			placeholder="Ask a question..."
			bind:value={question}
			class="h-11 flex-1"
			aria-label="Question"
		/>
		<Button type="submit" disabled={loading} class="h-11 px-5">
			{#if loading}
				Thinking...
			{:else}
				Ask
			{/if}
		</Button>
	</form>

	{#if errorMsg}
		<p class="text-sm text-destructive">{errorMsg}</p>
	{/if}

	{#if answer}
		<div class="w-full rounded-lg border p-4">
			<h2 class="mb-2 text-lg font-semibold">Answer</h2>
			<p class="leading-relaxed whitespace-pre-wrap">{answer}</p>

			{#if sources?.length}
				<div class="mt-4">
					<Collapsible bind:open={sourcesOpen} class="w-full">
						<CollapsibleTrigger
							class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent/50"
						>
							<span class="flex items-center gap-2">
								<h3 class="text-foreground">Sources</h3>
								<span class="text-xs text-muted-foreground">{sources.length}</span>
							</span>
							<ChevronDown
								class={`size-4 transition-transform ${sourcesOpen ? 'rotate-180' : ''}`}
							/>
						</CollapsibleTrigger>
						<CollapsibleContent class="mt-2">
							<ul class="space-y-3">
								{#each sources as s}
									<li>
										<blockquote class="border-l-2 pl-4">
											<p class="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
												{s.text}
											</p>
											<Separator class="mt-2" />
										</blockquote>
									</li>
								{/each}
							</ul>
						</CollapsibleContent>
					</Collapsible>
				</div>
			{/if}
		</div>
	{/if}
</section>
