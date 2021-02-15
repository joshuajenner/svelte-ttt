<div class="features">
	{#each items as item}
		<div class="item">
			<h3>{item.title}</h3>
			<p>{item.text}</p>
		</div>
	{/each}
</div>

<script>
	import items from '@assets/features.json';
</script>

<style lang="css">
	.features {
		display: grid;
		grid-gap: 32px;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		padding-bottom: 64px;
	}
	
	.item h3 {
		margin-bottom: 8px;
	}
	
	@media screen and (min-width: 1200px) {
		.features {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
