
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
        this.input.min = '2';
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


/*declaration of empty board*/ 
class Puzzle{
    constructor () {
        this._infoField = document.createElement('div');
        this._infoField.className='field'; 
        document.body.appendChild(this._infoField);
        this.field = document.querySelector('.field'); 
        
        
        this.generator = new BoardGenerator();
        this.info = new Info();
        this.cells = new ChipList();

        this.size = 4;
        this.numbers = this.generator.generate(this.size * this.size);
        this._initialize();
        this._createField(this.size); 
    }

     _initialize () {
        document.getElementById('fieldSize')
            .addEventListener('input', () => {
                let value = document.getElementById('fieldSize')
                this.size = value.valueAsNumber;
            })
        document.getElementById('generateField')
            .addEventListener('click', () => {
                this._removeField()
                this._createField(this.size)
                
                this.info.resetCounter()
                this.info.resetTime()
                this.changeFieldSize()

                if (this.info.buttonSound.sound) {
                    this.info.audioClick.play();
                  }
                
            });
    }
    
    changeFieldSize(){
        let newSize = this.size * this.cells.list[0].cellSize;
        document.querySelector(".field").style.height = `${newSize}px`;
        document.querySelector(".field").style.width = `${newSize}px`;
    }
    

    _createField (n) {
        this.numbers = this.generator.generate(n * n);
       
        for (let i = 0; i < this.numbers.length; i++){
            const value = this.numbers[i];
            const left = i % n; 
            const top = (i - left) / n; //вычисляем ряд и столбик для ячейки

            let chip = new Chip(value, left, top, this.field);
            this.cells.list.push(chip); 
           
            
            chip.element.addEventListener('click', () => {
                if (this.info.buttonSound.sound) {
                    this.info.audioClick.play();
                  }

                this._move(i);
            }) 
        

            /*chip.element.onmousedown = (event) => {
                console.log("MOUSE DOWN")
                chip.element.style.position = 'absolute';
                chip.element.style.zIndex = 1000;
                let fieldCoordinates = this.field.getBoundingClientRect();   
                console.log("FIELD ABSOLUTE", fieldCoordinates.left, fieldCoordinates.top)
        
                let mouseTransformedX = event.pageX - fieldCoordinates.left;
                let mouseTransformedY = event.pageY - fieldCoordinates.top;
                console.log("MOUSE", event.pageX, event.pageY);  
                console.log("MOUSE TRANSFORMED", mouseTransformedX, mouseTransformedY)
        
                let chipX = parseInt(chip.element.style.top);
                let chipY = parseInt(chip.element.style.left);
                console.log("CHIP BEGIN", chipX, chipY);  
  
                let shiftX = mouseTransformedX - chipX;
                let shiftY = mouseTransformedY - chipY;
        
                console.log("SHIFT", shiftX, shiftY)

                if (this.info.buttonSound.sound) {
                    this.info.audioClick.play();
                  }
                chip.element.onmousemove = (event) => {
                     this._onMouseMove(i, event, shiftX, shiftY); 
                }
            }

            chip.element.onmouseup = () => {
                console.log("MOUSE UP")
                chip.element.onmousemove = null;
            }

            chip.element.ondragstart = function() {
                return false;
            };*/
        }
        this.cells.hideEmptyChip();
    }

    /*_onMouseMove(index, event, shiftX, shiftY){
        
        let chip = this.cells.list[index];

        let fieldCoordinates = this.field.getBoundingClientRect();
        console.log("FIELD ABSOLUTE INSIDE", fieldCoordinates.left, fieldCoordinates.top) 
        let mouseTransformedX = event.pageX - fieldCoordinates.left;
        let mouseTransformedY = event.pageY - fieldCoordinates.top;
        console.log("MOUSE TRANSFORMED INSIDE", mouseTransformedX, mouseTransformedY)

        let diffX  = `${mouseTransformedX - shiftX}`
        let diffY = `${mouseTransformedY - shiftY}`

        console.log("DIFF", diffX, diffY)

        chip.element.style.left = diffX + 'px';
        chip.element.style.top =  diffY + 'px';
    }*/

    _removeField () {
        for (let i = 0; i < this.cells.list.length; i++){
            this.field.removeChild(this.cells.list[i].element);
        }
        this.cells.list = [];
    }

    _move (index) {
        let chip = this.cells.list[index]; //получаем доступ к i ячейке
        //проверка соседние ли ячейки
        let empty = this.cells.getEmptyCell();
        const leftDiff = Math.abs(empty.left -  chip.left);
        const topDiff = Math.abs(empty.top -  chip.top);
            if (leftDiff + topDiff > 1){
                return;
            }
           
            chip.element.style.left = `${empty.left * chip.cellSize}px`;
            chip.element.style.top = `${empty.top * chip.cellSize}px`;
    
        //задаем координаты ячеек
        const emptyLeft = empty.left; //координаты пустой клетки
        const emptyTop = empty.top;//координаты пустой клетки
        empty.left = chip.left; //текущие координаты ячейки
        empty.top = chip.top; //текущие координаты ячейки
        chip.left = emptyLeft; 
        chip.top = emptyTop; //записываем в объект координаты
    
        this.info.counter++;
        this.info.updateCounter();
        

        if (this.cells.isSorted()){
            let modal = $modal({
                title: 'You WON!',
                content: ['You found the solution and spent: ' + this.info.hour + ' hour ' + this.info.min +  ' min ' + this.info.sec + ' sec ' +  ' and ' +  this.info.counter + ' moves!' +  
                '<img src="images/win.jpg" alt="win" style="display: block; height: auto; max-width: 100%;">'],
                
              });
              modal.show();
              
            //alert("You WON! You found the solution and spent: " + this.info.hour + ' hour ' + this.info.min +  ' min ' + this.info.sec + ' sec ' +  ' and ' +  this.info.counter + " moves!");
        }
    }

} //end class Puzzle


/*declaration of chip*/ 
class Chip{
    constructor(value, left, top, field){
        this.element = document.createElement('div');
        this.element.className='cell';
        this.element.innerHTML = value; //выводим номера ячеек
        this.value = value;
        this.left = left;
        this.top = top;

        field.append(this.element);
        this.cellSize = document.querySelector('.cell').offsetWidth ;//размер ячейки
      
        this.element.style.left = `${this.left * this.cellSize}px`;
        this.element.style.top = `${this.top * this.cellSize}px`; //применяем стили с позицией для ячеек
    }

    isEmpty() {
        return this.value === 0;
    }
}

/*declaration of array with chips*/ 
class ChipList{
    constructor(){
        this.list = [];
    }

     getEmptyCell() {
        for (let i = 0; i <  this.list.length; i++){
            if ( this.list[i].isEmpty()){
                return  this.list[i];
            }
        } 
     }
     
     hideEmptyChip(){

        for (let i = 0; i < this.list.length; i++){
            if (this.list[i].isEmpty() === true){
                this.list[i].element.style.display = "none";  
               break;
            }
        }
     }

     isSorted(){
         let size = Math.sqrt(this.list.length);
         let emptyChip = null;

         for (let i = 0; i < this.list.length; i++){
             if (this.list[i].isEmpty() === true){
                emptyChip = this.list[i];
                break;
             }
         }

        let emptyCoordinate = size * emptyChip.top + emptyChip.left
        if(emptyCoordinate === 0){
             for (let i = 1; i < this.list.length; i++){
                 let currentChip = this.list[i];
                 if (currentChip.value === 0){
                     continue;
                 }
                 if (currentChip.value !== size * currentChip.top + currentChip.left){
                     return false;
                 } 
             } 
             return true;
         } 
         
         if (emptyCoordinate === this.list.length - 1){
             for (let i = 0; i < this.list.length - 1; i++){
                let currentChip = this.list[i];
                if (currentChip.value === 0){
                    continue;
                }
                if (currentChip.value !== size * currentChip.top + currentChip.left + 1){
                    return false;
                } 
            } 
            return true;
        }
    }
} //end class ChipList


/*declaration of board generator*/ 
class BoardGenerator{
    generate(maxSize) {
       const numbers = [...Array(maxSize).keys()]
           .sort(() => Math.random() - 0.5);
       
       return numbers;
   }
}

let puzzleGame = new Puzzle();











