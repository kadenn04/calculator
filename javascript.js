function add(x,y) {
    return x+y;
}

function subtract(x,y) {
    return x-y;
}

function multiply(x,y) {
    return x*y;
}

function divide(x,y) {
    return x/y;
}



function operate(numberOne, numberTwo, operation) {
    switch(operation) {
        case "+":
            return add(numberOne, numberTwo);
        case "-":
            return subtract(numberOne, numberTwo);
        case "*":
            return multiply(numberOne, numberTwo);
        case "/":
            return divide(numberOne, numberTwo);
        default:
            console.log("ERROR: no valid operation");
            return NaN;
    }
}

var hiddenNumber = NaN;
var operation = "";
var visibleNumber = 0;
var currentDisplay = "";
var recentResult = NaN;

function appendDigit(digit) {
    visibleNumber = visibleNumber*10 + Number(digit);
}

function processButtonPress(symbol) {
    if (isDigit(symbol)) {
        // Symbol is digit
        if (!isNaN(recentResult)) {
            visibleNumber = Number(symbol);
            hiddenNumber = NaN;
        } else if (isNaN(visibleNumber)) {
            // visibleNumber is NaN/empty: set visibleNumber to symbol
            visibleNumber = Number(symbol);
        } else {
            // visibleNumber has number: append symbol to visibleNumber 
            appendDigit(symbol);
        }
    
    } else if (symbol === "C") {
        // Symbol is clear
        visibleNumber = NaN;
        hiddenNumber = NaN;
        
    } else if (symbol === "=") {
        // Symbol is equals
        if (!isNaN(hiddenNumber) && !isNaN(visibleNumber) && (operation != "")){
            // hiddenNumber, visibleNumber, and operation all ready
            hiddenNumber = operate(hiddenNumber, visibleNumber, operation);
            display.textContent = hiddenNumber.toString();
            operation = "";
            visibleNumber = NaN;
            secondaryDisplay.textContent = ""
            recentResult = 1;
            return;
        }
        
    } else {
        // Symbol is operation
        if (isNaN(hiddenNumber)) {
            // Both numbers empty: fill first number & begin on second number
            hiddenNumber = visibleNumber
            visibleNumber = NaN;
            operation = symbol;
        } else if (isNaN(visibleNumber)) {
            // hiddenNumber has number, operation has operation, visibleNumber empty: replace operation
            operation = symbol;    
        } else if (operation != "") {
            // hiddenNumber has number, operation has operate, visibleNumber has number: 
            // operate and set hiddenNumber to the result, set visibleNumber to NaN, set operation to symbol
            hiddenNumber = operate(hiddenNumber, visibleNumber, operation);
            visibleNumber = NaN;
            operation = symbol;
        }
    }

    if (isNaN(visibleNumber)) {
        display.textContent = "";
    } else {
        display.textContent = visibleNumber.toString();
    }

    if (isNaN(hiddenNumber)) {
        secondaryDisplay.textContent = "";
    } else {
        secondaryDisplay.textContent = hiddenNumber.toString();
    }
    recentResult = NaN;
}

function isDigit(symbol) {
    return (!isNaN(Number(symbol)));
}

const allDigits = ['0','1','2','3','4','5','6','7','8','9'];

allDigits.forEach((digit) => {
    var calcButton = document.querySelector("#button-"+digit);
    calcButton.addEventListener("click", () => {
        processButtonPress(digit);
    })
})

var addButton = document.querySelector("#button-add");
addButton.addEventListener("click", () => {
    processButtonPress("+");
})

var subtractButton = document.querySelector("#button-subtract");
subtractButton.addEventListener("click", () => {
    processButtonPress("-");
})

var multiplyButton = document.querySelector("#button-multiply");
multiplyButton.addEventListener("click", () => {
    processButtonPress("*");
})

var divideButton = document.querySelector("#button-divide");
divideButton.addEventListener("click", () => {
    processButtonPress("/");
})

var equalButton = document.querySelector("#button-equal");
equalButton.addEventListener("click", () => {
    processButtonPress("=");
})

var clearButton = document.querySelector("#button-clear");
clearButton.addEventListener("click", () => {
    processButtonPress("C");
})

var display = document.querySelector("#visibleNumber");
var secondaryDisplay = document.querySelector("#hiddenNumber");