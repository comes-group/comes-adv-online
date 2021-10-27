export const Music = {
	Region1_OverworldTheme: new Audio("./assets/music/comes_adventures_-_overworld.opus")
}

export class AudioManager {
	currently_playing_music: HTMLAudioElement;

	play_music(music: HTMLAudioElement, loop: boolean = false) {
		if(this.currently_playing_music == music) {
			music.play();
			return;
		}

		this.currently_playing_music = music;
		music.play();
	}

	stop_music() {
		this.currently_playing_music.pause();
	}
};