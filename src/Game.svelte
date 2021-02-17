<script>
	import { room } from "./store.js";
	import { socket } from "./store.js";

	let board = [];

	function leaveRoom() {
		$socket.emit("leaveroom", $room);
		room.set(undefined);
	}

	async function initBoard() {
		const res = await fetch("http://127.0.0.1:3000/getboard", {
			method: "POST",
			body: JSON.stringify({
				room: $room,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const board = await res.json();
		console.log(board);
		return board;
	}
	board = initBoard();
</script>

<div id="roomInfo">
	<h3>Room Code: {$room}</h3>
	<div>
		<button on:click={leaveRoom}>Leave</button>
	</div>
</div>
<div>
	<p>Your turn</p>
	<div id="board">
		{#await board}
			<h3>Loading Board...</h3>
		{:then b}
			<div id="boardGrid">
				{#each b as tile}
					<div class="tile">
						<div class="tileContent">{tile}</div>
					</div>
				{/each}
			</div>
		{/await}
	</div>
</div>

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
		bottom: 50%;
		left: 50%;
	}
</style>
