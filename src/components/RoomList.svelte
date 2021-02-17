<script>
  import { room } from "../store.js";
  import { socket } from "../store.js";
  import { user } from "../store.js";

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
    const res = await fetch("http://127.0.0.1:3000/getrooms", {
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
  refreshRooms();
</script>

<style>
  #listHeader,
  .roomItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .roomData {
    display: flex;
    align-items: center;
  }
</style>

<div id="listHeader">
  <h1>All Rooms</h1>
  <div>
    <button on:click={refreshRooms}>Refresh</button>
    <button on:click={createRoom}>Create</button>
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
                <button on:click={joinRoom(room.roomcode)}>Watch</button>
              {:else}
                <button on:click={joinRoom(room.roomcode)}>Play</button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <h3>No rooms found. Please click above to create one.</h3>
    {/if}
  {:catch error}
    <h3>Error</h3>
  {/await}
</div>
