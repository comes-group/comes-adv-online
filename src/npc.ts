import { create_player_collision, rect_intersect, Vector2 } from "./common";
import { Dialogs } from "./dialog_manager";
import Entity, { Direction, EntityType } from "./entity";
import { Quests } from "./quest_manager";
import World from "./world";

export class TalkableNPC implements Entity {
	type = EntityType.TalkableNPC;
	name = "<DEFAULT TalkableNPC name>";
	size = new Vector2(32, 32);
	_position = new Vector2(0, 0);
	hitbox = new Vector2(32, 32);

	interactable_area = new Vector2(96, 96);

	pre_calculated_iract_area_pos = new Vector2(
		(this.position.x + this.size.x / 2) - this.interactable_area.x / 2,
		(this.position.y + this.size.y / 2) - this.interactable_area.y / 2
	);

	health = -1;
	facing = Direction.North;

	sprite: HTMLImageElement = new Image();

	interact_callback: (npc: TalkableNPC, world: World) => void;

	constructor(name: string, sprite_src: string, interact: (npc: TalkableNPC, world: World) => void) {
		this.name = name;
		this.sprite.src = sprite_src;
		this.interact_callback = interact;
	}

	public get position() {
		return this._position;
	}

	public set position(pos: Vector2) {
		this._position = pos;
		this.pre_calculated_iract_area_pos = new Vector2(
			(this.position.x + this.size.x / 2) - this.interactable_area.x / 2,
			(this.position.y + this.size.y / 2) - this.interactable_area.y / 2
		);
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.sprite, this.position.x, this.position.y);
	}

	process(world: World) {
		create_player_collision(world.player, this.position, this.hitbox);

		if (rect_intersect(
			this.pre_calculated_iract_area_pos.x,
			this.pre_calculated_iract_area_pos.y,
			this.interactable_area.x,
			this.interactable_area.y,
			world.player.position.x,
			world.player.position.y,
			world.player.size.x,
			world.player.size.y
		)) {
			world.player.collides_with(world, [this]);
		}

	}

	interact(world: World) {
		this.interact_callback(this, world);
	}

	collides_with() { }
}

export const NPCs: { [key: string]: TalkableNPC } = {
	'Region1_OldMan': new TalkableNPC(
		"Old Man",
		"https://cdn.discordapp.com/attachments/635191339859836948/902221013150998608/unknown.png",
		(npc: TalkableNPC, world: World) => {
			world.dialog_man.start_dialog(
				world,
				Dialogs["OldMan_WelcomeComes"],
				npc.sprite.src,
				npc.name,
				() => {
					world.quest_man.start_quest(Quests["Region1_GetTheDaggerBoi"]);
				}
			);
		}
	)
}