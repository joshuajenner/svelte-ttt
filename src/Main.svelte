<script>
  import { url } from "./store.js";
  import { room } from "./store.js";
  import { socket } from "./store.js";

  import { io } from "socket.io-client";
  const socketio = io(`${$url}`);

  import Nav from "./components/Nav.svelte";
  import RoomList from "./components/RoomList.svelte";
  import Game from "./Game.svelte";

  socket.set(socketio);
</script>

<style>
  #container {
    margin: 0px 16px;
  }
</style>

<Nav />
<div id="container">
  {#if $room == undefined}
    <RoomList />
  {:else}
    <Game />
  {/if}
</div>
