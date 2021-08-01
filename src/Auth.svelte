<script>
	import { user } from "./store.js";
	import { loggedIn } from "./store.js";
	import { url } from "./store.js";

	let loginUser;
	let loginPass;
	let signUser;
	let signPass;
	let loginResult = "";
	let signResult = "";

	let current = "login";

	async function login() {
		const res = await fetch(`${$url}/login`, {
			method: "POST",
			body: JSON.stringify({
				loginUser: loginUser,
				loginPass: loginPass,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const loginjson = await res.json();
		loginResult = loginjson.message;
		if (loginjson.success) {
			loggedIn.set(true);
			user.set(loginjson.username);
		}
	}

	async function signup() {
		const res = await fetch(`${$url}/signup`, {
			method: "POST",
			body: JSON.stringify({
				signUser,
				signPass,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const signjson = await res.json();
		signResult = signjson.message;
		console.log(signResult);
	}
</script>

<div id="auth">
	<h1>TicTacToe</h1>
	<form class={current === "login" ? "selected" : ""}>
		<h3>Login</h3>
		<label for="loginUser">Username</label>
		<input type="text" id="loginUser" name="loginUser" bind:value={loginUser} />
		<label for="loginPass">Password</label>
		<input type="password" id="loginPass" name="loginPass" bind:value={loginPass} />
		<div class="errorMessage">
			<p>{loginResult}</p>
		</div>
		<button class="btb submit" type="button" on:click={login}>Submit</button>
		<p class="switch" on:click={() => (current = "signup")}>I don't have an account. Signup.</p>
	</form>

	<form class={current === "signup" ? "selected" : ""}>
		<h3>Signup</h3>
		<label for="signUser">Username</label>
		<input type="text" id="signUser" name="signUser" bind:value={signUser} />
		<label for="signPass">Password</label>
		<input type="password" id="signPass" name="signPass" bind:value={signPass} />
		<div class="errorMessage">
			<p>{signResult}</p>
		</div>
		<button class="btb submit" type="button" on:click={signup}>Submit</button>
		<p class="switch" on:click={() => (current = "login")}>I already have an account. Login.</p>
	</form>
</div>

<style>
	#auth {
		margin-top: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	form {
		display: none;
	}
	.selected {
		display: block;
	}

	h1 {
		color: crimson;
		text-transform: uppercase;
		margin-bottom: 32px;
	}
	h3 {
		color: darkslategrey;
		margin-bottom: 24px;
	}
	label {
		font-size: 16px;
		margin-top: 16px;
		margin-bottom: 4px;
	}
	.errorMessage {
		font-size: 16px;
		margin: 8px 0px;
		color: crimson;
	}
	.switch {
		color: cornflowerblue;
		font-size: 16px;
		margin-top: 32px;
	}
	.switch:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.submit {
		margin-top: 8px;
	}
</style>
