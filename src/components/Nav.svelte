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
    border-bottom: 1px solid gray;
    padding: 8px 4px 8px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<nav>
  <div id="userNav">{$user}</div>
  <div id="logout">
    <button on:click={handleLogout}>Logout</button>
  </div>

</nav>
