<header class="hero">
	<Nav />
	<div class="titles">
		<h1>PWA</h1>
		<h3>Universal Builder</h3>
	</div>
	<div bind:this={elem} class="shapes" />
</header>

<script>
	import { onMount } from 'svelte';
	import Nav from '@components/Nav';

	let elem;
	const SHAPES = ['point', 'square', 'penta', 'circle', 'cross'];

	onMount(() => {
		const ww = elem.clientWidth;
		const wh = elem.clientHeight;
		const offset = elem.offsetTop;
		const steps = wh / 2;

		function Particle() {
			let y = wh;
			let dir = Math.random() > 0.5 ? -1 : 1;
			let fric = Math.random() * 3 + 1;
			let scale = Math.random() + 0.5;
			let sine = Math.random() * 60;
			let x = ww * Math.random();

			let item = document.createElement('span');
			item.className = 'shape' + ' ' + SHAPES[SHAPES.length * Math.random() | 0];
			item.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
			elem.appendChild(item);

			let height = item.clientHeight;
			let target = -1 * height;

			return () => {
				y -= fric;
				let rot = dir * Math.abs(y + height);
				let left = x + Math.sin(y * Math.PI / steps) * sine;
				item.style.transform = `translate3d(${left}px,${y}px,0) scale(${scale}) rotate(${rot}deg)`;
				return (y > target) || item.remove();
			}
		}

		let last = 0;
		let running = 1;
		let particles = [];

		window.onblur = window.onfocus = () => {
			running = document.hasFocus();
		};

		function update(ms) {
			let len = particles.length;
			if (running && len < 50 && (ms - last) > 200) {
				last = ms;
				particles.push(Particle());
			}
			while (len--) {
				particles[len]() || particles.splice(len, 1);
			}
			requestAnimationFrame(update);
		}

		update();

		return () => {
			cancelAnimationFrame(update);
		};
	});
</script>

<style lang="css">
	.hero {
		position: relative;
		background-color: var(--offwhite);
		border-bottom: 2px solid var(--blue);
		max-height: 600px;
		min-height: 300px;
		height: 45vh;
	}
	
	.shapes {
		width: 100%;
		position: absolute;
		transform: translateZ(0);
		overflow: hidden;
		bottom: 0;
		top: 0;
	}
	
	.titles {
		height: 0;
		z-index: 2;
		position: relative;
		font-family: var(--font-header), var(--font-list);
		text-transform: uppercase;
		/*top: calc(14.5vh - 56px)*/
		top: calc(30% - 56px);
		text-align: center;
		/*top: 80px;*/
	}
	
	.titles h1 {
		font-size: 2.875em;
		font-weight: 800;
		line-height: 1;
	}
	
	.titles h3 {
		line-height: 2;
		font-weight: 200;
		letter-spacing: 2px;
		font-size: 1.25em;
		color: #5e7283;
	}
	
	:global(.shape) {
		--size: 30px;
		position: absolute;
		will-change: transform;
		background: transparent no-repeat center;
		background-size: contain;
		height: var(--size);
		width: var(--size);
	}
	
	:global(.penta) {
		background-image: url(~@assets/shapes/penta.svg);
	}
	
	:global(.point) {
		background-image: url(~@assets/shapes/point.svg);
	}
	
	:global(.square) {
		background-image: url(~@assets/shapes/square.svg);
	}
	
	:global(.cross) {
		background-image: url(~@assets/shapes/cross.svg);
	}
	
	:global(.circle) {
		background-image: url(~@assets/shapes/circle.svg);
	}
	
	@media screen and (max-width: 421px) {
		:global(.shape) {
			--size: 20px;
		}
	}
</style>
