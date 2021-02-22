<script>
  import { room } from "./store.js";
  import { user } from "./store.js";
  import { socket } from "./store.js";
  import { url } from "./store.js";

  let turn = "";
  let roomInfo;
  let role = "";
  let board = [];
  let opponent = [];
  let winner = "none";
  let roomClosed = false;

  function leaveRoom() {
    $socket.emit("leaveroom", $room);
    room.set(undefined);
  }

  async function initBoard() {
    const res = await fetch(`${$url}/initboard`, {
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
    if (!winner.localeCompare("none")) {
      if (opponent.length > 1) {
        if (!role.localeCompare("player")) {
          if (!turn.localeCompare($user)) {
            $socket.emit("sendmove", [room, tile, $user]);
          }
        }
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
  $socket.on("winner", arg => {
    let addClass = "";
    winner = arg[0];
    turn = "";
    var tiles = document.getElementsByClassName("tile");
    if (role.localeCompare("viewer")) {
      if (!winner.localeCompare($user)) {
        addClass = "winnerTile";
      } else {
        addClass = "loserTile";
      }
    } else {
      addClass = "viewerTile";
    }
    for (let i = 0; i < arg[1].length; i++) {
      tiles[arg[1][i]].classList.add(addClass);
    }
  });
  $socket.on("playerdc", arg => {
    roomClosed = true;
    turn = "";
  });
  $socket.on("boardfull", arg => {
    roomClosed = true;
    turn = "";
    winner = "tied";
  });
</script>

<style>
  #roomInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0px;
  }
  #opponentInfo {
    padding: 24px 0px 8px 0px;
  }
  #board {
    position: relative;
  }
  #boardGrid {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    border: 2px solid gray;
  }
  #winBox,
  #roomClosed {
    position: absolute;
    top: 50%;
    right: 50%;
    width: 70%;
    height: 70%;
    transform: translate(50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #winBox > *,
  #roomClosed > * {
    margin-bottom: 24px;
  }
  .tile {
    position: relative;
    border: 1px solid lightgray;
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
  .winnerTile {
    background-color: darkseagreen;
  }
  .loserTile {
    background-color: indianred;
  }
  .viewerTile {
    background-color: lightsteelblue;
  }
</style>

<div id="roomInfo">
  <h3>Room Code: {$room}</h3>
  <div>
    <button class="btr" on:click={leaveRoom}>Leave</button>
  </div>
</div>
<div id="opponentInfo">
  {#if opponent.length === 1}
    <p>Waiting for opponent...</p>
  {:else if opponent.length === 2}
    {#if !role.localeCompare('player')}
      {#each opponent as op}
        {#if op.localeCompare($user)}
          <p>Playing against: {op}</p>
        {/if}
      {/each}
    {:else}
      <p>You are viewing:</p>
      <p>{opponent[0]} VS {opponent[1]}</p>
    {/if}
  {/if}
</div>

<div id="board" class={role}>
  {#await board}
    <p>Loading Board...</p>
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
  {#if winner.localeCompare('none')}
    <div id="winBox">
      {#if !winner.localeCompare('tied')}
        <div id="winTitle">
          <h3>Game Tied</h3>
        </div>
      {:else}
        <div id="winTitle">
          <h3>Winner:</h3>
        </div>
        <div id="winName">
          <h3>{winner}</h3>
        </div>
      {/if}
      <div id="winLeave">
        <button class="btr" on:click={leaveRoom}>Leave</button>
      </div>
    </div>
  {/if}
  {#if !winner.localeCompare('none')}
    {#if roomClosed == true}
      <div id="roomClosed">
        <div id="closedMessage">
          {#if !role.localeCompare('player')}
            <h2>Your opponent disconnected.</h2>
          {:else}
            <h2>A player disconnected.</h2>
          {/if}
        </div>
        <div id="closedLeave">
          <button class="btr" on:click={leaveRoom}>Leave</button>
        </div>
      </div>
    {/if}
  {/if}
</div>
<div id="turn">
  {#if turn.localeCompare('')}
    {#if opponent.length > 1}
      {#if !role.localeCompare('viewer')}
        <p>Turn: {turn}</p>
      {:else if !turn.localeCompare($user)}
        <p>Your move.</p>
      {:else}
        <p>Your opponent's move...</p>
      {/if}
    {/if}
  {/if}
</div>
