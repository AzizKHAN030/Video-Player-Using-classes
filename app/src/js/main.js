 class Player{
     constructor(selector){
         this.player = document.querySelector(selector);
         this.video = this.player.querySelector('video');
         this.playVideo();
     }
     
     playVideo(){
         this.video.addEventListener('click',this.toggleVideo.bind(this));
         this.player.querySelector('.controls__inner-play').addEventListener('click',this.toggleVideo.bind(this));
         this.video.addEventListener('dblclick',this.toggleFullscreen.bind(this));
         this.player.querySelector('.controls__inner-fullscreen').addEventListener('click',this.toggleFullscreen.bind(this));
         this.player.querySelector('.controls__sound-mute').addEventListener('click',this.muteSound.bind(this));
         this.player.querySelector('.controls__sound-line').addEventListener('click', this.setLine.bind(this));
         
         
         
         this.volumeIcon = this.player.querySelector('.controls__sound-mute i');
     }
     
        toggleVideo(){
            this.playing = !this.playing;
            this.video[this.playing ? 'play' : 'pause'](); 
            
            
            
            const playIcon =  this.player.querySelector('.controls__inner-play i');
            playIcon.classList.toggle('fa-pause',this.playing);
            playIcon.classList.toggle('fa-play',!this.playing);
        }
        
        
        toggleFullscreen(){
            const full = !document.fullscreenElement;
            console.log(full);
            
            
            const screenIcon = this.player.querySelector('.controls__inner-fullscreen i');
            screenIcon.classList.toggle('fa-compress',full);
            screenIcon.classList.toggle('fa-expand',!full);
            if(full){
                this.player.requestFullscreen();
            }
            else{
                document.exitFullscreen();
            }
        }
        
        muteSound(){
            this.muted = !this.muted;
            
            this.volumeIcon.classList.toggle('fa-volume-mute',this.muted);
            this.volumeIcon.classList.toggle('fa-volume-up',!this.muted);
            
            if(this.muted){
                this.video.volume = 0;
            }else{
                this.video.volume = this.player.querySelector('.controls__sound-line').getAttribute('data-value');
            }
            
        }
        
        setLine(e){
            console.log(e);
            const width = e.offsetX;
            const parentWidth = e.target.clientWidth;
            e.target.querySelector('.line').style.width=`${width/parentWidth*100}%`;
            e.target.setAttribute('data-value',width/parentWidth);
            
            if(e.target.classList.value.search("sound")){
                this.video.volume = e.target.getAttribute('data-value');
                if(this.video.volume===0){
                    this.muteSound();
                }else{
                    this.volumeIcon.classList.remove('fa-volume-mute');
                    this.volumeIcon.classList.add('fa-volume-up');
                }
            }
            
        }
 }
 
 
 const player = new Player('.player')  