<script>
  import { room } from "../store.js";
  import { socket } from "../store.js";

  let check = 0;
  let createdRoom = "";

  $socket.on("updaterooms", arg => {
    console.log(arg);
  });

  function createRoom() {
    while (check == 0) {
      check = Math.random();
    }
    createdRoom = check.toString(36).substr(2, 5);
    joinRoom(createdRoom);
    check = 0;
  }

  function joinRoom(givenRoom) {
    $socket.emit("joinroom", givenRoom);
    room.set(givenRoom);
  }
  function listRooms() {
    $socket.emit("listrooms");
  }
  listRooms();
</script>

<style>
  #listHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<div id="listHeader">
  <h1>All Rooms</h1>
  <div>
    <button on:click={createRoom}>Create</button>
  </div>

</div>
