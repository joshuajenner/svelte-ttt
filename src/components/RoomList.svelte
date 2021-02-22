<script>
  import { room } from "../store.js";
  import { socket } from "../store.js";
  import { user } from "../store.js";
  import { url } from "../store.js";

  let check = 0;
  let createdRoom = "";
  let listedRooms = [];

  function createRoom() {
    while (check == 0) {
      check = Math.random();
    }
    createdRoom = check.toString(36).substr(2, 5);
    joinRoom(createdRoom);
    check = 0;
  }

  function joinRoom(givenRoom) {
    $socket.emit("joinroom", [givenRoom, $user]);
    room.set(givenRoom);
  }
  async function listRooms() {
    const res = await fetch(`${$url}/getrooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const rooms = await res.json();
    console.log(rooms);
    return rooms;
  }

  function refreshRooms() {
    listedRooms = listRooms();
  }
  $socket.on("roomsrefreshed", arg => {
    refreshRooms();
  });
  refreshRooms();
</script>

<style>
  #listHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0px;
    border-bottom: 1px solid lightgrey;
  }
  .roomItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid lightgrey;
    padding: 32px 0px;
  }
  #listRoomTitle {
    display: flex;
    align-items: center;
  }
  #listRoomTitle h1 {
    margin-right: 24px;
  }
  .roomData {
    display: flex;
    align-items: center;
  }
  .roomJoin {
    margin-left: 16px;
  }
  .refresh {
    font-size: 36px;
  }
  #noRooms {
    margin-top: 24px;
  }
</style>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Icons"
    rel="stylesheet" />
</svelte:head>
<div id="listHeader">
  <div id="listRoomTitle">
    <h1>All Rooms</h1>
    <span class="material-icons refresh" on:click={refreshRooms}>cached</span>
  </div>
  <div>
    <button class="btb" on:click={createRoom}>Create</button>
  </div>
</div>

<div id="allRooms">
  {#await listedRooms}
    <h3>Loading...</h3>
  {:then rooms}
    {#if rooms.length > 0}
      {#each rooms as room}
        <div class="roomItem">
          <div class="roomNum">{room.roomcode}</div>
          <div class="roomData">
            <div class="numJoined">{room.users.length}/2</div>
            <div class="roomJoin">
              {#if room.users.length > 1}
                <button class="btw" on:click={joinRoom(room.roomcode)}>
                  Watch
                </button>
              {:else}
                <button class="btp" on:click={joinRoom(room.roomcode)}>
                  Play
                </button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <div id="noRooms">
        <h2>No rooms found. Please click above to create one.</h2>
      </div>
    {/if}
  {:catch error}
    <h3>Error</h3>
  {/await}
</div>
