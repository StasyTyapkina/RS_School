class Calculator {
  getSum (a, b) {
    return a + b;
  }

  getMinus (a, b) {
    return a - b;
  }

  getMul (a, b) {
    return a * b;
  }

  getDiv (a, b) {
    return a / b;
  }

  getPow (a, b) {
    return a ** b;
  }

  getSqrt (a) {
    return Math.sqrt(a);
  }
}

class CalculatorController {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement; 
    this.calculator = new Calculator(); 
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
  }

  handleMinus(){
    if(this.currentOperand === '' || this.currentOperand === '√'){
      this.currentOperand = `${this.currentOperand.toString()} ${'-'}`;
      return;
    } 

    if (this.currentOperand[this.currentOperand.length - 1] === '-') {
      return;
    }

    this.calculateIntermediateResult();
    this.operation = '-';
    this.swapOperands();
  }

  handleOperation(operation){
    if(this.checkIsOperandsEmpty() || this.currentOperand === '-'){
      this.currentOperand = '';
      return;
    }

    this.calculateIntermediateResult();
    this.operation = operation;
    this.swapOperands();
  }

  checkIsOperandsEmpty(){
    if(this.currentOperand === '' && this.previousOperand === ''){
      return true;
    } else {
      return false;
    }
  }

  calculateIntermediateResult() {
    if (this.previousOperand !== '') {
      return this.calculate();
    }
  }

  handleSqrt(){
    if(this.currentOperand === ''){
      this.currentOperand = '√';
    }
  }

  removeNumber(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if(this.currentOperand[0] === '0' && !this.currentOperand.includes('.') && number !== '.'){
      this.currentOperand = number;
      return;
    }

    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    }

    if(this.operation === '') {
      this.currentOperand = '';
      this.operation = null;
    }

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }

  swapOperands(){
    if(this.currentOperand === ''){
      return;
    }
    this.previousOperand = `${this.currentOperand} ${this.operation}`;
    this.currentOperand = '';
  }

  calculate() {
    if (this.checkIsOperandsEmpty()) {
      return;
    }

    let calculationResult;
  
    if(this.currentOperand[0] === '√') {
      calculationResult = this.calculateSqrt(this.currentOperand);
      this.currentOperand = calculationResult;
    }
    if (this.previousOperand[0] === '√') {
      calculationResult = this.calculateSqrt(this.previousOperand);
      this.previousOperand = calculationResult;
    }
    
    if(this.operation !== null) {
      calculationResult = this.calculateOperation();
    }

    this.currentOperand = parseFloat(calculationResult.toFixed(10));
    this.operation = '';
    this.previousOperand = '';
  }

  calculateSqrt(operand)
  {
    const slicedOperand = operand.toString().slice(1);
    const floatOperand = parseFloat(slicedOperand);
    return this.calculator.getSqrt(floatOperand);
  }

  calculateOperation()
  {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    
    switch (this.operation) {
      case '+':
        return this.calculator.getSum(prev,current);

      case '-':
        return this.calculator.getMinus(prev,current);

      case '*':
        return this.calculator.getMul(prev,current);

      case '÷':
        return this.calculator.getDiv(prev,current);

      case '^':
        return this.calculator.getPow(prev,current);

      default:
        return;
    }
  }

}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const sqrtButton = document.querySelector('[data-operation-sqrt]');
const minusButton = document.querySelector('[data-operation-minus]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculatorController = new CalculatorController(previousOperandTextElement, currentOperandTextElement);

for (let i = 0; i < numberButtons.length; i++) {
  const button = numberButtons[i];
  button.addEventListener('click', () => {
    calculatorController.appendNumber(button.innerText);
    calculatorController.updateDisplay();
  });
};

for (let i = 0; i < operationButtons.length; i++) {
  const button = operationButtons[i];
  button.addEventListener('click', () => {
    calculatorController.handleOperation(button.innerText);
    calculatorController.updateDisplay();
  });
};

minusButton.addEventListener('click', button => {
  calculatorController.handleMinus();
  calculatorController.updateDisplay();
});

sqrtButton.addEventListener('click', button => {
  calculatorController.handleSqrt();
  calculatorController.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculatorController.clearAll();
  calculatorController.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculatorController.removeNumber();
  calculatorController.updateDisplay();
});

equalsButton.addEventListener('click', button => {
  calculatorController.calculate();
  calculatorController.updateDisplay();
});
