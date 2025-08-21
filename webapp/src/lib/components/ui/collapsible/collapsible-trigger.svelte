<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
	import type { WithElementRef, WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithElementRef<WithoutChildrenOrChild<CollapsiblePrimitive.TriggerProps>> & {
		children?: any;
	} = $props();
</script>

<CollapsiblePrimitive.Trigger bind:ref data-slot="collapsible-trigger" {...restProps}>
	{@render children?.()}
</CollapsiblePrimitive.Trigger>
