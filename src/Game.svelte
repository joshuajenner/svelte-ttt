<script>
  import { room } from "./store.js";
  import { user } from "./store.js";
  import { socket } from "./store.js";

  let turn;
  let roomInfo;
  let role = "";
  let board = [];
  let opponent = [];

  function leaveRoom() {
    $socket.emit("leaveroom", $room);
    room.set(undefined);
  }

  async function initBoard() {
    const res = await fetch("http://127.0.0.1:3000/initboard", {
      method: "POST",
      body: JSON.stringify({
        room: $room
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const board = await res.json();
    return board;
  }
  board = initBoard();

  function sendMove(room, tile) {
    if (!role.localeCompare("player")) {
      if (!turn.localeCompare($user)) {
        $socket.emit("sendmove", [room, tile, $user]);
      }
    }
  }

  $socket.on("roominfo", arg => {
    opponent = [];
    for (let a = 0; a < arg[0].length; a++) {
      if (!arg[0][a].name.localeCompare($user)) {
        role = arg[0][a].role;
      }
      if (!arg[0][a].role.localeCompare("player")) {
        opponent.push(arg[0][a].name);
        opponent = opponent;
      }
    }
    turn = arg[1];
  });
  $socket.on("boardchanged", arg => {
    board = arg[0];
    turn = arg[1];
    console.log("newBoard - ", arg);
  });
</script>

<style>
  #roomInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #boardGrid {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    border: 2px solid gray;
  }
  .tile {
    position: relative;
    border: 1px dashed lightgray;
    font-family: "Permanent Marker", cursive;
    font-size: 64px;
  }
  .tile:nth-child(1),
  .tile:nth-child(2),
  .tile:nth-child(3) {
    border-top: none;
  }
  .tile:nth-child(7),
  .tile:nth-child(8),
  .tile:nth-child(9) {
    border-bottom: none;
  }
  .tile:nth-child(3n + 1) {
    border-left: none;
  }
  .tile:nth-child(3n) {
    border-right: none;
  }
  .tile:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  .tileContent {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tileContent p {
    margin: 0px;
  }
  .viewer .tile {
    opacity: 0.8;
  }
</style>

<div id="roomInfo">
  <h3>Room Code: {$room}</h3>
  <div>
    <button on:click={leaveRoom}>Leave</button>
  </div>
</div>
{#if opponent.length === 1}
  <h3>Waiting for opponent...</h3>
{:else if opponent.length === 2}
  {#if !role.localeCompare('player')}
    {#each opponent as op}
      {#if op.localeCompare($user)}
        <h3>Playing against: {op}</h3>
      {/if}
    {/each}
  {:else}
    <h3>You are viewing:</h3>
    <h3>{opponent[0]} VS {opponent[1]}</h3>
  {/if}
{/if}
<div id="board" class={role}>
  {#await board}
    <h3>Loading Board...</h3>
  {:then b}
    <div id="boardGrid">
      {#each b as tile, i}
        <div class="tile" on:click={sendMove($room, i)}>
          <div class="tileContent">
            {#if tile === 0}
              <p />
            {:else if tile === 1}
              <p>O</p>
            {:else if tile === 2}
              <p>X</p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/await}
</div>
<div id="turn" />
