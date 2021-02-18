<script>
	import { user } from "../store";
	import { loggedIn } from "../store";

	function handleLogout() {
		loggedIn.set(false);
		user.set("");
	}
</script>

<nav>
	<div id="userNav"><input bind:value={$user} /></div>
	<div id="logout">
		<button on:click={handleLogout}>Logout</button>
	</div>
</nav>

<style>
	nav {
		border-bottom: 1px solid gray;
		padding: 8px 4px 8px 4px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
