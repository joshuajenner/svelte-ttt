<script>
  import { loggedIn } from "./store.js";

  import Auth from "./Auth.svelte";
  import Main from "./Main.svelte";

  // add ! to loggedin
</script>

<style>
  main {
    margin: 0 auto;
  }
</style>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Roboto&display=swap"
    rel="stylesheet" />
</svelte:head>
<main>
  {#if !$loggedIn}
    <Auth />
  {:else}
    <Main />
  {/if}
</main>
