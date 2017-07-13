 class GameSound {
     constructor(){
        this.backgroundAudio = new Audio('./assets/sound/bk-sound.wav');
        this.jumpAudio = new Audio('./assets/sound/jump.wav')
        this.gameoverAudio = new Audio('./assets/sound/game_over.wav')

        // this.mute = false;

     }

     play(mute){
        if (!mute){
          this.backgroundAudio.loop = true;
          this.backgroundAudio.play();
          this.backgroundAudio.volume = .2;
        } else {
          this.backgroundAudio.pause();
        }
     }

     mute(){
        let status = document.getElementById('sound-btn');
        // status.addEventListener ("click", () => {
        //     if (status.value === 'pause'){
        //       status.value = 'play';
        //     }
        //     else {
        //       status.value = 'pause';
        //     }
        // });
        this.backgroundAudio.pause();
        this.jumpAudio.pause();
        this.gameoverAudio.pause();
     }

     playJump(mute){
        if (!mute){
          this.backgroundAudio.volume = .1;
          this.jumpAudio.play();
          this.jumpAudio.volume = .5;
          this.backgroundAudio.volume = .2;
        } else {
          this.backgroundAudio.pause();
          this.jumpAudio.pause();
        }
     }

     palyGameover(mute){
        if(!mute){
          this.gameoverAudio.play();
          this.gameoverAudio.volme = .1;
        } else {
          this.gameoverAudio.pause();
        }
     }    
 }
 export default GameSound;