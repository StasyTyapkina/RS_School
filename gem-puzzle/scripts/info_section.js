class Info{
    constructor () {
       
        this._infoField = document.createElement('div');
        this._infoField.className='info_field'; 
        document.body.appendChild(this._infoField);
        
        this.label = document.createElement('label');
        this.label.setAttribute('for', "fieldSize")
        this.label.innerHTML = `Размер игрового поля <br>(min 3х3, max 8х8): `;
        this._infoField.appendChild(this.label);

        this.input = document.createElement('input');
        this.input.type = 'number';
        this.input.min = '3';
        this.input.max = '8';
        this.input.setAttribute('id','fieldSize') ;
        this.input.value = '4';
        this._infoField.appendChild(this.input);
       
        
        this.button = document.createElement('button');
        this.button.id = 'generateField';
        this.button.innerHTML = `New game`;
        this._infoField.appendChild(this.button);

        this.buttonSound = document.createElement('button');
        this.buttonSound.sound = false;
        this.buttonSound.classList.add('buttonSound',"buttonSound--activatable"); 
        this.buttonSound.classList.toggle("buttonSound--active",  this.buttonSound.sound);
        this.buttonSound.innerHTML = `Sound`;
        this.buttonSound.title = "Нажмите, чтобы включить звук при кликах"
        this._infoField.appendChild(this.buttonSound);

        this.buttonSound.addEventListener('click', () => {
            this._toggleSound();
            this.buttonSound.classList.toggle("buttonSound--active",   this.buttonSound.sound);
           
            if (this.buttonSound.sound) {
              this.audioClick.play();
            }
          });


        this._timer = document.createElement('div');
        this._timer.id ='timer'; 
        this._infoField.appendChild(this._timer);
        this.hour = 0;
        this.min = 0;
        this.sec = 0;
        setInterval(() => { this.tick() }, 1000);

        this.counter = 0; 
        this._counterTitle = document.createElement('div');
        this._counterTitle.className='counter'; 
        this._counterTitle.innerHTML = `<span class="moves"> Ходов: ${this.counter}</span>`;
        this._infoField.appendChild(this._counterTitle);

        this.audio = document.createElement('audio');
        this.audio.controls = true;
        this.audio.autoplay = true;
        this.audio.volume = 0.3;
        this.audio.loop = true;
        this.audio.src = "sounds/wave.mp3";
        this._infoField.appendChild(this.audio);

        this.audioClick = document.createElement('audio');
        this.audioClick.id= "audio"
        this.audioClick.src = "sounds/tink.mp3";
        document.body.appendChild(this.audioClick);
    
    } //end constructor


    _toggleSound() {
        this.buttonSound.sound = !this.buttonSound.sound
      }

    updateCounter(){
        this._counterTitle.innerHTML = `<span class="moves"> Ходов: ${this.counter}</span>`;
    }

    resetCounter(){
        this.counter = 0;
        this._counterTitle.innerHTML = `<span class="moves"> Ходов: ${this.counter}</span>`;
    }

    resetTime(){
        this.hour = 0;
        this.min = 0;
        this.sec = 0;
    }

    tick() {
        this.sec++;
        if (this.sec >= 60) { 
            this.min++;
            this.sec = this.sec - 60;
        }
        if (this.min >= 60) {
            this.hour++;
            this.min = this.min - 60;
        }
        if (this.sec < 10) { 
            if (this.min < 10) {
                if (this.hour < 10) {
                    document.getElementById('timer').innerHTML = "Время: " +'0' + this.hour + ':0' + this.min + ':0' + this.sec;
                } else {
                    document.getElementById('timer').innerHTML = "Время: " + this.hour + ':0' + this.min + ':0' + this.sec;
                }
            } else {
                if (this.hour < 10) {
                    document.getElementById('timer').innerHTML = "Время: " +'0' + this.hour + ':' + this.min + ':0' + this.sec;
                } else {
                    document.getElementById('timer').innerHTML = "Время: " + this.hour + ':' + this.min + ':0' + this.sec;
                }
            }
        } else {
            if (this.min < 10) {
                if (this.hour < 10) {
                    document.getElementById('timer').innerHTML = "Время: " +'0' + this.hour + ':0' + this.min + ':' + this.sec;
                } else {
                    document.getElementById('timer').innerHTML = "Время: " + this.hour + ':0' + this.min + ':' + this.sec;
                }
            } else {
                if (this.hour < 10) {
                    document.getElementById('timer').innerHTML = "Время: " +'0' + this.hour + ':' + this.min + ':' + this.sec;
                } else {
                    document.getElementById('timer').innerHTML = "Время: " + this.hour + ':' + this.min + ':' + this.sec;
                }
            }
        }
    }
} //end class Info

export { Info };