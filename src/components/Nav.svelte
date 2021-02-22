<script>
  import { user } from "../store";
  import { loggedIn } from "../store";

  function handleLogout() {
    loggedIn.set(false);
    user.set("");
  }
</script>

<style>
  nav {
    border-bottom: 1px solid lightgray;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
</style>

<nav>
  <div id="userNav">
    <!-- <input bind:value={$user} /> -->
    <h2>{$user}</h2>
  </div>
  <div id="logout">
    <button class="btg" on:click={handleLogout}>Logout</button>
  </div>
</nav>
