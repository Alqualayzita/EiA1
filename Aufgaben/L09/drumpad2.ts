window.addEventListener("load", function (): void {
    
      var sound: HTMLAudioElement[] = [
        new Audio ("../L08/assets/sound/a.mp3"), 
        new Audio ("../L08/assets/sound/c.mp3"), 
        new Audio ("../L08/assets/sound/F.mp3"), 
        new Audio ("../L08/assets/sound/G.mp3"), 
        new Audio ("../L08/assets/sound/hihat.mp3"), 
        new Audio ("../L08/assets/sound/kick.mp3"), 
        new Audio ("../L08/assets/sound/laugh-1.mp3"), 
        new Audio ("../L08/assets/sound/laugh-2.mp3"), 
        new Audio ("../L08/assets/sound/snare.mp3")];


      var beat: HTMLAudioElement[] = [
        new Audio ("../L08/assets/sound/kick.mp3"),
        new Audio ("../L08/assets/sound/snare.mp3"),
        new Audio ("../L08/assets/sound/hihat.mp3")];
          
      var index: number = 0;

      function playSample(music: HTMLAudioElement= new Audio): void { 
        music.play();
       }

      document.querySelector(".soundA").addEventListener("click", function (): void { playSample(sound[0]); });
      document.querySelector(".soundC").addEventListener("click", function (): void { playSample(sound[1]); });
      document.querySelector(".soundF").addEventListener("click", function (): void { playSample(sound[2]); });
      document.querySelector(".soundG").addEventListener("click", function (): void { playSample(sound[3]); });
      document.querySelector(".soundHihat").addEventListener("click", function (): void { playSample(sound[4]); });
      document.querySelector(".soundKick").addEventListener("click", function (): void { playSample(sound[5]); });
      document.querySelector(".soundLaugh1").addEventListener("click", function (): void { playSample(sound[6]); });
      document.querySelector(".soundLaugh2").addEventListener("click", function (): void { playSample(sound[7]); });
      document.querySelector(".soundSnare").addEventListener("click", function (): void { playSample(sound[8]); });

      document.querySelector("#play").addEventListener("click", function (): void {
        var loop: number = setInterval(function (): void {
          playSample( beat [index] );
          index += 1;
          if (index > 2)
                    index = 0;
          document.querySelector("#stop").addEventListener("click", function (): void {
                  clearInterval(loop);
                });
            },                         500);
        });
  
      document.querySelector("#play").addEventListener("click", function(): void{
            document.querySelector("#play").classList.add("hidden");
            document.querySelector("#stop").classList.remove("hidden");
          });
        
      document.querySelector("#stop").addEventListener("click", function(): void{
            document.querySelector("#stop").classList.add("hidden");
            document.querySelector("#play").classList.remove("hidden");
          });


      document.querySelector("#shuffle").addEventListener("click", function (): void {
            var playShuffle: number = setInterval(function (): void {
                playSample( sound [index] );
                index = Math.floor(Math.random () * 9);
                },
                                                  500);
            });
        });