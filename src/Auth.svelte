<script>
  let loginUser;
  let loginPass;
  let signUser;
  let signPass;
  let loginResult = null;
  let signResult = null;

  let current = "login";

  async function login() {
    const res = await fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      body: JSON.stringify({
        loginUser,
        loginPass
      })
    });
    const loginjson = await res.json();
    loginResult = JSON.stringify(loginjson);
    console.log(loginResult);
  }

  async function signup() {
    const res = await fetch("http://127.0.0.1:3000/signup", {
      method: "POST",
      body: JSON.stringify({
        signUser,
        signPass
      })
    });
    const signjson = await res.json();
    signResult = JSON.stringify(signjson);
    console.log(signResult);
  }
</script>

<style>
  form {
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

  @media (min-width: 640px) {
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
  <button type="button" on:click={login}>Submit</button>
  <p class="switch" on:click={() => (current = 'signup')}>
    I don't have an account. Signup.
  </p>
  {loginResult}
</form>

<form class={current === 'signup' ? 'selected' : ''}>
  <h1>Signup</h1>
  <label for="signUser">Username</label>
  <input type="text" id="signUser" name="signUser" bind:value={signUser} />
  <label for="signPass">Password</label>
  <input type="password" id="signPass" name="signPass" bind:value={signPass} />
  <br />
  <button type="button" on:click={signup}>Submit</button>
  <p class="switch" on:click={() => (current = 'login')}>
    I already have an account. Login.
  </p>
</form>
