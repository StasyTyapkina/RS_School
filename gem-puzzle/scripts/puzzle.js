import {Info} from './info_section';
import {Chip} from './chip';
import {ChipList} from './chip';
import {BoardGenerator} from './board_generator';


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
        
        }
        this.cells.hideEmptyChip();
    }

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


let puzzleGame = new Puzzle();

export { Puzzle };



