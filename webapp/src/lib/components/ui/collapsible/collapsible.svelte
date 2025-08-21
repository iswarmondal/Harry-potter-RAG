<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
	import type { WithElementRef, WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		open = $bindable(false),
		children,
		...restProps
	}: WithElementRef<WithoutChildrenOrChild<CollapsiblePrimitive.RootProps>> & {
		children?: any;
	} = $props();
</script>

<CollapsiblePrimitive.Root bind:ref bind:open data-slot="collapsible" {...restProps}>
	{@render children?.()}
</CollapsiblePrimitive.Root>
