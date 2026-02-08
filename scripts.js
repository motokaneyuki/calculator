const digitButtons = document.querySelectorAll('.digits');
const operatorButtons = document.querySelectorAll('.operators');
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

let expression = {
    firstNumber: null,
    operator: '',
    secondNumber: null,
}

// to get the first number
function firstListener(event){
    let getNumber = event.target.textContent;
    console.log(getNumber);
    answer.textContent += getNumber;

    expression.firstNumber = Number(answer.textContent);
    console.log(expression.firstNumber);  
}

digitButtons.forEach(button => {
    button.addEventListener('click', firstListener);
})

// to get the operator
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (expression.firstNumber === null){
            return;
        }

        let getOperator = e.target.textContent;
        console.log(getOperator);
        expression.operator = getOperator;
        console.log(expression.operator);

        // to keep the first number as is
        digitButtons.forEach(button => {
            button.removeEventListener('click', firstListener);
        })

        let tempFirstNumber = expression.firstNumber;
        console.log("temp", tempFirstNumber);
    
        // to get the second number
        digitButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (expression.secondNumber === null){
                    answer.textContent = '';
                }
                
                let getNumber = e.target.textContent;
                console.log(getNumber);
                answer.textContent += getNumber;

                expression.secondNumber = Number(answer.textContent);
                expression.firstNumber = tempFirstNumber;
                console.log("exp", expression);
            })
        })    

    })
})
