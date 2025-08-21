<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
	import type { WithElementRef, WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithElementRef<WithoutChildrenOrChild<CollapsiblePrimitive.ContentProps>> & {
		children?: any;
	} = $props();
</script>

<CollapsiblePrimitive.Content bind:ref data-slot="collapsible-content" {...restProps}>
	{@render children?.()}
</CollapsiblePrimitive.Content>
