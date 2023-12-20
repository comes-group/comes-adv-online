import { WorldLayers, TileSet } from "../world_layers";

import world1_tileset from "../../ComesAdventureWorld1-Tileset.json";
import world1_map from "../../ComesAdventureWorld1-Map.json";
import { WorldRenderer } from "./world_renderer";
import { Camera } from "./camera";

// Get game canvas from DOM and retrieve context.
const game_canvas: HTMLCanvasElement = document.getElementById('game-canvas')! as HTMLCanvasElement;
const ctx = game_canvas.getContext('2d')!;

// Create tileset and world layers
const tileset = new TileSet();
const world_layers = new WorldLayers();

// Camera
const camera = new Camera();

// Keys
const pressed_keys: {
	[key: string]: boolean
} = {}

namespace DevTools {
  export function wsad_camera_travel() {
    const speed = 5;

    if (pressed_keys["w"]) {
			camera.position.y -= speed;
			// S - Backwards
		} else if (pressed_keys["s"]) {
			camera.position.y += speed;
		}

		// A - Left
		if (pressed_keys["a"]) {
			camera.position.x -= speed;
			// D - Right
		} else if (pressed_keys["d"]) {
			camera.position.x += speed;
		}
  }
}

function init() {
  // Load tilset and world_layers
  tileset.load_from_data(world1_tileset);
  world_layers.load_from_data(tileset, world1_map);

  // Handle keyboard events
  document.body.addEventListener('keydown', (ev) => {
    if(ev.key == " ") {
      ev.preventDefault();
    }

    pressed_keys[ev.key.toLowerCase()] = true;
  });

  document.body.addEventListener('keyup', (ev) => {
    delete pressed_keys[ev.key.toLowerCase()];
  });
}

// Game loop
function game_loop() {
  // Clear screen
  ctx.clearRect(0, 0, 800, 600);

  // Start camera work
  camera.start(ctx);

  // Render world layers in correct orders
  WorldRenderer.render_layer(ctx, camera, world_layers, world_layers.layer_collidable);
  WorldRenderer.render_layer(ctx, camera, world_layers, world_layers.layer_non_collidable);

  DevTools.wsad_camera_travel();

  // End camera work
  camera.end(ctx);

	window.requestAnimationFrame(game_loop);
}

init();
window.requestAnimationFrame(game_loop);