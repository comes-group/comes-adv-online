import { Vector2 } from "../common";
import { WorldLayerChunk, WorldLayers } from "../world_layers";
import { Camera } from "./camera";

export namespace WorldRenderer {
  export function render_layer(ctx: CanvasRenderingContext2D, camera: Camera, world_layers: WorldLayers, layer: Array<WorldLayerChunk>, on_tile_render?: (tile_x: number, tile_y: number) => void) {
    for (const chunk of layer) {
      let world_chunk_pos = new Vector2(world_layers.tilesize.x * chunk.position.x, world_layers.tilesize.y * chunk.position.y);

      // Optimize drawing by checking if chunk is in viewing distance
      if (!camera.check_if_in_bound(
        ctx, world_chunk_pos,
        new Vector2(
          world_layers.tilesize.x * chunk.size.x,
          world_layers.tilesize.y * chunk.size.y
        )
      )) {
        continue;
      }

      for (let x = 0; x < chunk.tiles.length; x++) {
        const el = chunk.tiles[x];

        for (let y = 0; y < el.length; y++) {
          const tile_id = el[y];

          if (tile_id == 0) continue;

          let tile = world_layers.tileset.get_tile_by_id(tile_id)!;

          let tile_world_x = world_chunk_pos.x + (world_layers.tilesize.x * x);
          let tile_world_y = world_chunk_pos.y + (world_layers.tilesize.y * y);

          ctx.drawImage(
            tile.image,
            tile_world_x,
            tile_world_y
          );

          if (on_tile_render) on_tile_render(tile_world_x, tile_world_y);
        }
      }
    }
  }
}