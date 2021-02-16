<script>
  import { loggedIn } from "./store.js";

  import Auth from "./Auth.svelte";
  import Main from "./Main.svelte";
</script>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }
</style>

<main>
  {#if $loggedIn}
    <Auth />
  {:else}
    <Main />
  {/if}
</main>
