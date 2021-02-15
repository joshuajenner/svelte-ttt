<div class="app">

	<Hero />

	<Window />

	<main class="wrapper">
		<Feats />

		<section class="section">
			<h2>Installation</h2>
			<Code text="npm install --global @pwa/cli" />
			<Code offset label="OR" text="yarn global add @pwa/cli" />
		</section>

		<section class="section">
			<h2>Commands</h2>
			<Code label="Scaffold a new project!" text="pwa init" />
			<Code label="Run development/live-reload server" text="pwa watch" />
			<Code label="Build production bundle(s)" text="pwa build" />
			<Code label="Generate static HTML exports" text="pwa export" />
		</section>
	</main>

	<Footer />
</div>

<script>
	import Hero from '@components/Hero';
	import Footer from '@components/Footer';
	import Window from '@components/Window';
	import Feats from '@components/Feats';
	import Code from '@components/Code';
</script>

<style lang="css">
	.app {
		position: relative;
	}
	
	.wrapper {
		width: 75%;
		margin: 0 auto;
		position: relative;
		min-height: calc(55vh - 16px);
		z-index: 1;
	}
	
	.section {
		padding-bottom: 64px;
	}
	
	.section h2 {
		margin-bottom: 16px;
	}
	
	@media screen and (max-width: 769px) {
		.wrapper {
			width: 90%;
		}
	}
</style>
