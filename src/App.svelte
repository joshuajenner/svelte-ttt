<script>
  import { loggedIn } from "./store.js";

  import Auth from "./Auth.svelte";
  import Main from "./Main.svelte";

  // add ! to loggedin
</script>

<style>
  @font-face {
    font-family: Permanent Marker;
    src: url(PermanentMarker-Regular.ttf);
  }
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
