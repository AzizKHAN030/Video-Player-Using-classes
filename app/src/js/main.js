 class Player {
     constructor(selector) {
         this.player = document.querySelector(selector);
         this.video = this.player.querySelector('video');
         this.setHTML();
         this.playVideo();
     }

     setHTML() {
         this.player.insertAdjacentHTML('beforeend', `   <div class="seek seek-prev"><i class="fas fa-angle-double-left"></i><span>5 SEC</span></div>
         <div class="seek seek-next"><span>5 SEC</span><i class="fas fa-angle-double-right"></i></div>
         <div class="controls">
            <div class="controls__inner">
             <button class="controls__inner-play"><i class="fas fa-play"></i></button>
             <div class="controls__playback">
                 <button class="controls__playback-btn" data-speed="0.5">0.5X</button>
                 <button class="controls__playback-btn active" data-speed="1">1X</button>
                 <button class="controls__playback-btn" data-speed="1.5">1.5X</button>
             </div>
             <div class="controls__timeline">
                 <div class="line"></div>
             </div>
             <div class="controls__time"><span class="time-current">00:00</span>/<span class="time">00:00</span></div>
             <div class="controls__sound">
                 <button class="controls__sound-mute"><i class="fas fa-volume-up"></i></button>
                 <div class="controls__sound-line" data-value="1">
                     <div class="line"></div>
                 </div>
             </div>
             <button class="controls__inner-fullscreen"><i class="fas fa-expand"></i></button>
            </div>
         </div>`)
     }

     playVideo() {
         this.video.addEventListener('click', this.toggleVideo.bind(this));
         this.player.querySelector('.controls__inner-play').addEventListener('click', this.toggleVideo.bind(this));
         document.addEventListener('keyup', (e) => {
             if (e.code === 'Space') {
                 this.toggleVideo()
             }
         });
         this.video.addEventListener('dblclick', this.toggleFullscreen.bind(this));
         this.player.querySelector('.controls__inner-fullscreen').addEventListener('click', this.toggleFullscreen.bind(this));
         this.player.querySelector('.controls__sound-mute').addEventListener('click', this.muteSound.bind(this));
         this.player.querySelector('.controls__sound-line').addEventListener('click', this.setLine.bind(this));
         this.player.querySelector('.controls__timeline').addEventListener('click', this.setLine.bind(this));
         this.video.addEventListener('loadedmetadata', this.timeUpdate.bind(this));
         this.playbackBtns = this.player.querySelectorAll('.controls__playback-btn');
         this.playbackBtns.forEach((btn) => {
             btn.addEventListener('click', this.setSpeed.bind(this))
         });
         this.player.querySelectorAll('.seek').forEach((el) => {
             el.addEventListener('click', this.seekVideo.bind(this))
         });



         this.volumeIcon = this.player.querySelector('.controls__sound-mute i');
     }

     toggleVideo() {
         const playIcon = this.player.querySelector('.controls__inner-play i');
         this.playing = !this.playing;
         this.video[this.playing ? 'play' : 'pause']();
         playIcon.classList.toggle('fa-pause', this.playing);
         playIcon.classList.toggle('fa-play', !this.playing);
     }

     toggleFullscreen() {
         const full = !document.fullscreenElement;
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
             this.player.querySelector('.controls__sound-line .line').style.width = '0%';
         } else {
             this.video.volume = this.player.querySelector('.controls__sound-line').getAttribute('data-value');
             this.player.querySelector('.controls__sound-line .line').style.width = `${this.video.volume*100}%`;
         }

     }

     setLine(e) {
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

     setSpeed(e) {
         this.playbackBtns.forEach((btn) => {
             btn.classList.remove('active');
         });
         e.target.classList.add('active');
         this.video.playbackRate = e.target.getAttribute('data-speed');

     }

     seekVideo(e) {
         if (e.target.classList.contains('seek-prev')) {
             this.video.currentTime -= 5;
         } else if (e.target.classList.contains('seek-next')) {
             this.video.currentTime += 5;
         }

     }
 }

 const player = new Player('#player')