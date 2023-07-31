const screen = document.querySelector('.screen');
const keys = document.querySelector('.calcButtons');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateScreen(){
    screen.innerText = displayValue;
}
updateScreen();


keys.addEventListener('click', function(e) {
    const element = e.target;
    debugger
    if(!element.matches('button')) {
        return;
    }

    switch(element.value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            catchOperator(element.value);
            break;
        case '.':
            inputDecimal();
            break;
        case'delete':
            delet();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);
    }
    updateScreen();
});

function delet(){
    if(displayValue.length === 1){
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
}

function inputNumber(num) {
    if(waitingForSecondValue) {
        displayValue = num,
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num: displayValue + num;
    }
};

function inputDecimal() {
    if(!displayValue.includes('.')){
        displayValue += '.';
    }
};

function clear() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
};

function catchOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if(firstValue === null) {
        firstValue = value;
    } else if(operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
};

function calculate(first, second, operator) {
    if(operator === '+') {
        return first + second;
    } else if(operator === '-') {
        return first - second;
    } else if(operator === '*') {
        return first * second;
    } else if(operator === '/'){
        return first / second;
    }

    return second;
};