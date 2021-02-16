<script>
  import { room } from "./store.js";
  import { socket } from "./store.js";

  function leaveRoom() {
    $socket.emit("leaveroom", $room);
    room.set(undefined);
  }
</script>

<style>
  #roomInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<div id="roomInfo">
  <h3>Room Code: {$room}</h3>
  <div>
    <button on:click={leaveRoom}>Leave</button>
  </div>
</div>
<div>
  <p>Your turn</p>
</div>
