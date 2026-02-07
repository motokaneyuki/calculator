const buttons = document.querySelector('.lowerArea');
const answer = document.querySelector('.answer');

function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, firstNumber, secondNumber){
    switch(operator) {
        case 'sum':
            return sum(firstNumber, secondNumber);
        case 'subtract':
            return subtract(firstNumber, secondNumber);
        case 'multiply':
            return multiply(firstNumber, secondNumber);
        case 'divide':
            return divide(firstNumber, secondNumber);
    }
}

let firstNumber;
let secondNumber;
let operator;

buttons.addEventListener('click', (e) => {
    let getNumber = e.target.textContent;
    console.log(getNumber);
    answer.textContent += getNumber;

    firstNumber = Number(answer.textContent);
    console.log('first number:' + firstNumber);
})


