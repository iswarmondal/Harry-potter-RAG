<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { trpc } from '$lib';

	import type { AskOutput } from '@harry-potter-rag/trpc-shared';
	import { Separator } from '$lib/components/ui/separator';
	type AskResult = AskOutput;

	let question = $state('');
	let loading = $state(false);
	let answer = $state<string | null>(
		'Harry was Harry Potter—a wizard, the student at Hogwarts, and famously the boy who defeated You-Know-Who (Voldemort).'
	);
	let sources = $state<Array<{ id: string; score: number; text?: string }>>([
		{
			id: 'b66f52ec-b623-49e5-bb25-0798981bf07a',
			score: 0.8257319,
			text: "Harry, meanwhile, still had questions to ask, hundreds of them.  \n \n\"But what happened to Vol--, sorry -- I mean, You-Know-Who?\" \n \n\"Good question, Harry. Disappeared. Vanished. Same night he tried ter  \nkill you. Makes yeh even more famous . That's the biggest myst'ry, see... \nhe was gettin' more an' more powerful -- why'd he go? \n \n\"Some say he died. Codswallop, in my opinion. Dunno if he had enough  \nhuman left in him to die. Some say he's still out there, bidin' his  \ntime, like, but I don' believe it. People who was on his side came back  \nter ours. Some of 'em came outta kinda trances. Don~ reckon they  \ncould've done if he was comin' back.  \n \n\"Most of us reckon he's still out there somewhere but lost his powers.  \nToo weak to carry on. 'Cause somethin' about you finished him, Harry.  \nThere was somethin' goin' on that night he hadn't counted on -- I dunno \nwhat it was, no one does -- but somethin' about you stumped him, all  \nright.\" \n \nHagrid looked at Harry with warmth and respect blazing in his eyes, but \nHarry, instead of feeling pleased and proud, felt quite sure there had  \nbeen a horrible mistake. A wizard? Him? How could he possibly be? He'd  \nspent his life being clouted by Dudley, and bullied by Aunt Petunia and  \nUncle Vernon; if he was really a wizard, why hadn't they been turned  \ninto warty toads every time they'd tried to lock him in his cupboard? If  \nhe'd once defeated the greatest sorcerer in the world, how come Dudley  \nhad always been able to kick him around like a football?  \n \n\"Hagrid,\" he said quietly, \"I think you must have made a mistake. I  \ndon't think I can be a wizard.\" \n \nTo his surprise, Hagrid chuckled."
		},
		{
			id: 'dadddbfb-717d-4fee-8fe5-cf43eebbfbfd',
			score: 0.82359654,
			text: 'Potter at the Quidditch match, taking pictures of him while he was  \nlying in the mud. Next thing we know - Creevey\'s been attacked." \n \n"He always seems so nice, though," said Hannah uncertainly, "and,  \nwell, he\'s the one who made You -Know-Who disappear. He can\'t be \nall bad, can he?" \n \nErnie lowered his voice mysteriously, the Hufflepuffs bent closer, and  \nHarry edged nearer so that he could catch Ernie\'s words. \n \n"No one knows how he survived that attack by You -Know-Who. I \nmean to say, he was only a baby when it happened. He should have  \nbeen blasted into smithereens. Only a really powerful Dark wizard  \ncould have survived a curse like that." He dropped his voice until it  \nwas barely more than a whisper, and said, "That\'s probably why You - \nKnow-Who wanted to kill him in the first place. Didn\'t want another  \nDark Lord competing with him. I wonder what other powers Potter\'s  \nbeen hiding?" \n \nHarry couldn\'t take anymore. Clearing his throat loudly, he stepped out  \nfrom behind the bookshelves. If he hadn\'t been feeling so angry, he  \nwould have found the sight that greeted him funny: Every one of the  \nHufflepuffs looked as though they had been Pe trified by the sight of \nhim, and the color was draining out of Ernie\'s face.  \n \n"Hello," said Harry. "I\'m looking for Justin Finch -Fletchley." \n \nThe Hufepuffs\' worst fears had clearly been confirmed. They all  \nlooked fearfully at Ernie. \n \n"What do you want with him?" said Ernie in a quavering voice.  \n \n"I wanted to tell him what really happened with that snake at the  \nDueling Club," said Harry.'
		},
		{
			id: '3c69639e-11ae-4eb0-a2e7-970dce0b7c5c',
			score: 0.82241917,
			text: 'The boy who defeated He-Who-Must-Not-Be-Named is unstable and possibly \ndangerous, writes Rita Skeeter, Special Corresponde nt.  Alarming evidence \nhas recently come to light about Harry Potter\'s strange behavior, which casts \ndoubts upon his suitability to compete in a demanding competition like the \nTriwizard Tournament, or even to attend Hogwarts School. \nPotter, the Daily Prophet can exclusively reveal, regularly collapses at school, \nand is often heard to complain of pain in the scar on his forehead (relic of the \ncurse with which You-Know-Who attempted to kill him).  On Monday last, \nmidway through a Divination lesson, your Daily Prophet reporter witnessed \nPotter storming from the class, claiming that his scar was hurting too badly to \ncontinue studying. \nIt is possible, say top experts at St. Mungo\'s Hospital for Magical Maladies and \nInjuries, that Potters brain was affected by the attack inflicted upon him by \nYou-Know-Who, and that his insistence that the scar is still hurting is an \nexpression of his deep-seated confusion. \n"He might even be pretending," said one specialist. "This could be a plea for \nattention." \nThe Daily Prophet, however, has unearthed worrying facts about Harry Potter \nthat Albus Dumbledore, Headmaster of Hogwarts, has carefully concealed from \nthe wizarding public. \n"Potter can speak Parseltongue," reveals Draco Malfoy, a Hogwarts fourth year.  \n"There were a lot of attacks on students a couple of years ago, and most people \nthought Potter was behind them after they saw him lose his temper at a dueling \nclub and set a snake on another boy.  It was all hushed up, though. But he\'s \nmade friends with werewolves and giants too.  We think he\'d do anything for a \nbit of power." \nParseltongue, the ability to converse with snakes, has long been considered a \nDark Art.  Indeed, the most famous Parselmouth of our times is none other than \nYou-Know-Who himself.  A member of the Dark Force Defense League, who \nwished to remain unnamed, stated that he would regard any wizard who could \nspeak Parseltongue "as worthy of investigation. Personally, I would be highly \nsuspicious of anybody who could converse with snakes, as serpents are often \nused in the worst kinds of Dark Magic, and are historically associated with \nevildoers."  Similarly, "anyone who seeks out the company of such vicious \ncreatures as werewolves and giants would appear to have a fondness for \nviolence."'
		},
		{
			id: '65549607-dfa1-4f13-b748-e8e40437ff4c',
			score: 0.8190039,
			text: '"Harry," said Lockhart, his large white teeth gleaming in the sunlight  \nas he shook his head. "Harry, Harry, Harry."  \n \nCompletely nonplussed, Harry said  nothing. \n \n"When I heard -well, of course, it was all my fault. Could have kicked  \nmyself." \n \nHarry had no idea what he was talking about. He was about to say so  \nwhen Lockhart went on, "Don\'t know when I\'ve been more shocked.  \nFlying a car to Hogwarts! Well, of course, I knew at once why you\'d \ndone it. Stood out a mile. Harry, Harry, Harry."  \n \nIt was remarkable how he could show every one of those brilliant  \nteeth even when he wasn\'t talking. \n \n"Gave you a taste for publicity, didn\'t I?" said Lockhart. "Gave  \nyou the bug. You got onto the front page of the paper with me and  \nyou couldn\'t wait to do it again." \n"Oh, no, Professor, see -" \n"Harry, Harry, Harry," said Lockhart, reaching out and grasping  \nhis shoulder. "I understand. Natural to want a bit more once you\'ve  \nhad that first taste - and I blame myself for giving you that, be  \ncause it was bound to go to your head - but see here, young man, \nyou can\'t start flying cars to try and get yourself noticed. Just calm  \ndown, all right? Plenty of time for all that when you\' re older. Yes, \nyes, I know what you\'re thinking! \'It\'s all right for him, he\'s an in  \nternationally famous wizard already!\' But when I was twelve, I was  \njust as much of a nobody as you are now. In fact, Id say I was even  \nmore of a nobody! I mean, a few people have heard of you, haven\'t  \nthey? All that business with He -\\"o-Must-Not-Be-Named!" He \nglanced at the lightning scar on Harry\'s forehead. "I know, I  \nknow - it\'s not quite as good as winning Witch Weekly\'s Most  \nCharming-Smile Award five times in a row, as  I have - but it\'s a \nstart, Harry, it\'s a start."'
		}
	]);
	let errorMsg = $state<string | null>(null);

	async function onAsk() {
		errorMsg = null;
		answer = null;
		sources = [];
		const q = question.trim();
		if (!q) return;
		loading = true;
		try {
			const res = await trpc.ask.mutate({ prompt: q, topK: 4 });
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
					<h3 class="mb-1 text-sm font-medium text-muted-foreground">Sources</h3>
					<ul class="space-y-1">
						{#each sources as s}
							<blockquote class="mt-6 border-l-2 pl-6 italic">
								<p class="text-xs text-muted-foreground">{s.text}</p>
								<Separator class="mt-1" />
							</blockquote>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	{/if}
</section>
