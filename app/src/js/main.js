 class Player {
     constructor(selector) {
         this.player = document.querySelector(selector);
         this.video = this.player.querySelector('video');
         this.playVideo();
     }

     playVideo() {
         this.video.addEventListener('click', this.toggleVideo.bind(this));
         this.player.querySelector('.controls__inner-play').addEventListener('click', this.toggleVideo.bind(this));
         document.addEventListener('keyup',(e)=>{if(e.code==='Space'){console.log(561);this.toggleVideo()}});
         this.video.addEventListener('dblclick', this.toggleFullscreen.bind(this));
         this.player.querySelector('.controls__inner-fullscreen').addEventListener('click', this.toggleFullscreen.bind(this));
         this.player.querySelector('.controls__sound-mute').addEventListener('click', this.muteSound.bind(this));
         this.player.querySelector('.controls__sound-line').addEventListener('click', this.setLine.bind(this));
         this.player.querySelector('.controls__timeline').addEventListener('click', this.setLine.bind(this));
         this.video.addEventListener('loadedmetadata', this.timeUpdate.bind(this));



         this.volumeIcon = this.player.querySelector('.controls__sound-mute i');
     }

     toggleVideo() {
         this.playing = !this.playing;
         this.video[this.playing ? 'play' : 'pause']();
         console.log(this.video.duration);


         const playIcon = this.player.querySelector('.controls__inner-play i');
         playIcon.classList.toggle('fa-pause', this.playing);
         playIcon.classList.toggle('fa-play', !this.playing);
     }


     toggleFullscreen() {
         const full = !document.fullscreenElement;
         console.log(full);


         const screenIcon = this.player.querySelector('.controls__inner-fullscreen i');
         screenIcon.classList.toggle('fa-compress', full);
         screenIcon.classList.toggle('fa-expand', !full);
         if (full) {
             this.player.requestFullscreen();
         } else {
             document.exitFullscreen();
         }
     }

     muteSound() {
         this.muted = !this.muted;

         this.volumeIcon.classList.toggle('fa-volume-mute', this.muted);
         this.volumeIcon.classList.toggle('fa-volume-up', !this.muted);

         if (this.muted) {
             this.video.volume = 0;
         } else {
             this.video.volume = this.player.querySelector('.controls__sound-line').getAttribute('data-value');
         }

     }

     setLine(e) {
         console.log(e);
         const width = e.offsetX;
         const parentWidth = e.target.clientWidth;
         e.target.querySelector('.line').style.width = `${width/parentWidth*100}%`;
         e.target.setAttribute('data-value', width / parentWidth);

         if (e.target.classList.value.search("sound") >= 0) {
             this.video.volume = e.target.getAttribute('data-value');
             if (this.video.volume === 0) {
                 this.muteSound();
             } else {
                 this.volumeIcon.classList.remove('fa-volume-mute');
                 this.volumeIcon.classList.add('fa-volume-up');
             }
         } else if (e.target.classList.value.search("timeline") >= 0) {
             this.setTime();
         }

     }

     setTime() {
         const duration = this.video.duration;
         console.log(duration);
         this.video.currentTime = this.player.querySelector('.controls__timeline').getAttribute('data-value') * duration
     }

     timeUpdate() {
        const vidDuration = this.player.querySelector('.controls__time .time');
        const vidCurrent = this.player.querySelector('.controls__time .time-current');
        const timeLine = this.player.querySelector('.controls__timeline');
        vidDuration.innerHTML = `${Math.floor(this.video.duration/60)>=10?Math.round(this.video.duration/60):'0'+Math.round(this.video.duration/60)}:${Math.floor(this.video.duration%60)>=10?Math.round(this.video.duration%60):'0'+Math.floor(this.video.duration%60)}`;

        this.video.addEventListener('timeupdate', () => {
            vidCurrent.innerHTML = `${Math.floor(this.video.currentTime/60)>=10?Math.floor(this.video.currentTime/60):'0'+Math.floor(this.video.currentTime/60)}:${
                   Math.floor(this.video.currentTime%60)>=10?Math.floor(this.video.currentTime%60):'0'+Math.floor(this.video.currentTime%60)
               }`;

            timeLine.setAttribute('data-value', this.video.currentTime / this.video.duration);
            timeLine.querySelector('.line').style.width = `${timeLine.getAttribute('data-value')*100}%`;
        })


    }


 }


 const player = new Player('.player')