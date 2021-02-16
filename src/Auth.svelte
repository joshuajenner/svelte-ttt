<script>
  import { user } from "./store.js";
  import { loggedIn } from "./store.js";

  let loginUser;
  let loginPass;
  let signUser;
  let signPass;
  let loginResult = "";
  let signResult = "";

  let current = "login";

  async function login() {
    const res = await fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      body: JSON.stringify({
        loginUser: loginUser,
        loginPass: loginPass
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const loginjson = await res.json();
    loginResult = loginjson.message;
    if (loginjson.success) {
      loggedIn.set(true);
      user.set(loginjson.username);
    }
  }

  async function signup() {
    const res = await fetch("http://127.0.0.1:3000/signup", {
      method: "POST",
      body: JSON.stringify({
        signUser,
        signPass
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const signjson = await res.json();
    signResult = signjson.message;
    console.log(signResult);
  }
</script>

<style>
  form {
    text-align: center;
    display: none;
  }
  .selected {
    display: block;
  }

  h1 {
    color: crimson;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  .switch {
    color: midnightblue;
  }
  .switch:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>

<form class={current === 'login' ? 'selected' : ''}>
  <h1>Login</h1>
  <label for="loginUser">Username</label>
  <input type="text" id="loginUser" name="loginUser" bind:value={loginUser} />
  <label for="loginPass">Password</label>
  <input
    type="password"
    id="loginPass"
    name="loginPass"
    bind:value={loginPass} />
  <br />
  {loginResult}
  <br />
  <button type="button" on:click={login}>Submit</button>
  <p class="switch" on:click={() => (current = 'signup')}>
    I don't have an account. Signup.
  </p>

</form>

<form class={current === 'signup' ? 'selected' : ''}>
  <h1>Signup</h1>
  <label for="signUser">Username</label>
  <input type="text" id="signUser" name="signUser" bind:value={signUser} />
  <label for="signPass">Password</label>
  <input type="password" id="signPass" name="signPass" bind:value={signPass} />
  <br />
  {signResult}
  <br />
  <button type="button" on:click={signup}>Submit</button>
  <p class="switch" on:click={() => (current = 'login')}>
    I already have an account. Login.
  </p>
</form>
