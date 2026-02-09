const digitButtons = document.querySelectorAll('.digits');
const operatorButtons = document.querySelectorAll('.operators');
const equalButton = document.querySelector('.equalButton');
const allClear = document.querySelector('.allClear');
const answer = document.querySelector('.answer');
const calculations = document.querySelector('.calculations');

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
        case '+':
            return sum(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case 'x':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
    }
}

let expression = {
    firstNumber: null,
    operator: '',
    secondNumber: null,
    equalValue: null,
}

digitButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // when digit clicked again after equals, clear values
        if (answer.textContent == expression.equalValue){
            expression.equalValue = null;
            expression.firstNumber = null;
            expression.operator = '';
            expression.secondNumber = null;
            answer.textContent = '';
            calculations.textContent = '';
        }

        let getNumber = e.target.textContent;

        if (answer.textContent.length == 9){
            if (getNumber == 'C'){
                answer.textContent = answer.textContent.slice(0, -1);
                return;    
            }
            alert('Maximum input is 9 digits')
            return;
        }

        if (!expression.operator){
            // stops 2 periods
            if (getNumber == '.' && answer.textContent.includes('.')){
                return;
            }
            // backspace
            if (getNumber == 'C'){
                answer.textContent = answer.textContent.slice(0, -1);
                getNumber = '';
                if (answer.textContent == ''){
                    expression.firstNumber = null;
                    return;
                }
            }

            answer.textContent += getNumber;
            expression.firstNumber = Number(answer.textContent);
        } else {
            // clears screen when inputting second number
            if (expression.secondNumber === null){
                answer.textContent = '';
            }
            if (getNumber == '.' && answer.textContent.includes('.')){
                return;
            }
            if (getNumber == 'C'){
                answer.textContent = answer.textContent.slice(0, -1);
                getNumber = '';
                if (answer.textContent == ''){
                    expression.secondNumber = null;
                    return;
                }
            }
            
            answer.textContent += getNumber;
            expression.secondNumber = Number(answer.textContent);
        }    
    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (expression.firstNumber === null){
            return;
        }

        // if equal button is clicked already with computation value, do:
        if (expression.equalValue !== null){
            expression.firstNumber = expression.equalValue;
            expression.equalValue = null;
            expression.secondNumber = null;
            calculations.textContent = `${expression.firstNumber}`;
        }

        // if operator button is clicked with first&second values, do:
        if (expression.firstNumber !== null && expression.operator !== '' && expression.secondNumber !== null) {
            let expressionAnswer = operate(expression.operator, expression.firstNumber, expression.secondNumber);
            let fixedAnswer = Number(expressionAnswer.toFixed(3));
            expression.firstNumber = fixedAnswer;
            expression.secondNumber = null;
            expression.operator = '';
        }


        let getOperator = e.target.textContent;
        expression.operator = getOperator;
        answer.textContent = '';
        calculations.textContent = `${expression.firstNumber} ${expression.operator}`;
    })
})

equalButton.addEventListener('click', () => {
    if (expression.firstNumber === null 
        || expression.secondNumber === null 
        || expression.operator === ''){
            return;
        }
    
    let expressionAnswer = operate(expression.operator, expression.firstNumber, expression.secondNumber);

    let fixedAnswer;
    if (expressionAnswer.toString().length > 9){
        fixedAnswer = expressionAnswer.toExponential(0);
    } else {
        fixedAnswer = Number(expressionAnswer.toFixed(3));
    }
    answer.textContent = fixedAnswer;
    calculations.textContent = `${expression.firstNumber} ${expression.operator} ${expression.secondNumber}`;
    expression.equalValue = fixedAnswer;
})

allClear.addEventListener('click', () => {
    expression.firstNumber = null;
    expression.operator = '';
    expression.secondNumber = null;
    expression.equalValue = null;
    calculations.textContent = '';
    answer.textContent = '';
})