import { Vector2, rect_intersect } from "../common";

// Wrapper class for manipulating canvas
// making things more like in real game engine
export class Camera {
	position: Vector2 = new Vector2(0, 0);

	// Save canvas and change its position
	start(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.translate(-(this.position.x - ctx.canvas.clientWidth / 2), -(this.position.y - ctx.canvas.clientHeight / 2));
	}

	// Restore everything
	end(ctx: CanvasRenderingContext2D) {
		ctx.restore();
	}

	// Check if some rectangle is in viewing space
	// useful for optimizing which elements should be rendered
	check_if_in_bound(ctx: CanvasRenderingContext2D, pos: Vector2, size: Vector2): boolean {
		let x1 = this.position.x - ctx.canvas.clientWidth / 2;
		let y1 = this.position.y - ctx.canvas.clientHeight / 2;

		return rect_intersect(x1, y1, ctx.canvas.clientWidth, ctx.canvas.clientHeight, pos.x, pos.y, size.x, size.y);
	}
}