import World, { world } from "./world";
import { ItemEntity, ItemInfo, ItemInformations } from "./item";
import { WorldLayers, TileSet } from "./world_layers";

import world1_tileset from "../ComesAdventureWorld1-Tileset.json";
import world1_map from "../ComesAdventureWorld1-Map.json";

// Will be used for server, maybe.
var isNode = false;

// Get game canvas from DOM and retrieve context.
let game_canvas: HTMLCanvasElement = document.getElementById('game-canvas')! as HTMLCanvasElement;
let ctx = game_canvas.getContext('2d');

// Create tileset and world layers
let tileset = new TileSet();
let world_layers = new WorldLayers();

// Load tilset and world_layers
tileset.load_from_data(world1_tileset);
world_layers.load_from_data(tileset, world1_map);

world.load_world_layers(world_layers);

world.init();

// Game loop
function game_loop() {
	if(!world.gameover)
		world.render(ctx);

	window.requestAnimationFrame(game_loop);
}

// Handle keyboard events
document.body.addEventListener('keydown', (ev) => {
	if(ev.key == " ") {
		ev.preventDefault();
	}

	world.key_pressed[ev.key.toLowerCase()] = true;
});

document.body.addEventListener('keyup', (ev) => {
	delete world.key_pressed[ev.key.toLowerCase()];
});

window.requestAnimationFrame(game_loop);