const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';
let previousInput = '';
let operation = null;
let resetDisplay = false;

// Update the calculator screen
function updateDisplay() {
    display.textContent = currentInput;
}

// Handle numbers and '00'
function appendNumber(number) {
    if (currentInput === '0' || resetDisplay) {
        currentInput = number;
        resetDisplay = false;
    } else {
        currentInput += number;
    }
}

// Handle decimal point
function appendDecimal() {
    if (resetDisplay) {
        currentInput = '0.';
        resetDisplay = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

// Handle arithmetic operations (+, -, *, /)
function chooseOperation(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetDisplay = true;
}

// Perform calculations
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = '';
    resetDisplay = true;
}

// Clear all data (AC)
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    resetDisplay = false;
}

// Percentage conversion
function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
}

// Event Delegation on the container
keys.addEventListener('click', (e) => {
    const button = e.target;
    if (!button.classList.contains('btn')) return;

    const number = button.getAttribute('data-number');
    const action = button.getAttribute('data-action');

    if (number !== null) {
        appendNumber(number);
    } else if (action === 'decimal') {
        appendDecimal();
    } else if (action === 'clear') {
        clearAll();
    } else if (action === 'double-zero') {
        appendNumber('00');
    } else if (action === 'percent') {
        percentage();
    } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
        const opMap = { add: '+', subtract: '-', multiply: '*', divide: '/' };
        chooseOperation(opMap[action]);
    } else if (action === 'calculate') {
        calculate();
    }

    updateDisplay();
});
