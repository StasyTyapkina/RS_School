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

export { Chip };
export { ChipList };
