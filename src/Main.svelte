<script>
  import { io } from "socket.io-client";
  const socketio = io("http://127.0.0.1:3000");

  import { room } from "./store.js";
  import { socket } from "./store.js";

  import Nav from "./components/Nav.svelte";
  import RoomList from "./components/RoomList.svelte";
  import Game from "./Game.svelte";

  socket.set(socketio);
</script>

<style>

</style>

<Nav />
{#if $room == undefined}
  <RoomList />
{:else}
  <Game />
{/if}
