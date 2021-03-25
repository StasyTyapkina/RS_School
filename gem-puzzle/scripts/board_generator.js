class BoardGenerator{
    generate(maxSize) {
       const numbers = [...Array(maxSize).keys()]
           .sort(() => Math.random() - 0.5);
       
       return numbers;
   }
}

export {  BoardGenerator };