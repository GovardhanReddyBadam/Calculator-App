/* =========================
   DOM SELECTION
========================= */

const currentDisplay =
document.querySelector(".current-display");

const previousDisplay =
document.querySelector(".previous-display");

const numberButtons =
document.querySelectorAll(".number-btn");

const operatorButtons =
document.querySelectorAll(".operator-btn");

const equalButton =
document.querySelector(".equal-btn");

const actionButtons =
document.querySelectorAll(".action-btn");

const scientificButtons =
document.querySelectorAll("[data-scientific]");

const historyList =
document.querySelector(".history-list");

const clearHistoryBtn =
document.querySelector(".clear-history-btn");

const themeToggle =
document.getElementById("theme-toggle");


/* =========================
   CALCULATOR STATE
========================= */

let currentInput = "";

let previousInput = "";

let operator = "";

let history = [];


/* =========================
   UPDATE DISPLAY
========================= */

function updateDisplay(){

    currentDisplay.textContent =
    currentInput || "0";

    previousDisplay.textContent =
    previousInput + " " + operator;

}


/* =========================
   APPEND NUMBER
========================= */

function appendNumber(number){

    if(number === "." &&
       currentInput.includes(".")){

        return;

    }

    currentInput += number;

    updateDisplay();

}


/* =========================
   CHOOSE OPERATOR
========================= */

function chooseOperator(selectedOperator){

    if(currentInput === "") return;

    if(previousInput !== ""){

        calculate();

    }

    operator = selectedOperator;

    previousInput = currentInput;

    currentInput = "";

    updateDisplay();

}


/* =========================
   CALCULATE RESULT
========================= */

function calculate(){

    let result;

    const prev =
    parseFloat(previousInput);

    const current =
    parseFloat(currentInput);

    if(isNaN(prev) || isNaN(current)){

        return;

    }

    switch(operator){

        case "+":
            result = prev + current;
            break;

        case "-":
            result = prev - current;
            break;

        case "*":
            result = prev * current;
            break;

        case "/":

            if(current === 0){

                alert("Cannot divide by zero");

                return;

            }

            result = prev / current;
            break;

        case "%":
            result = prev % current;
            break;

        default:
            return;

    }

    addToHistory(
        `${prev} ${operator} ${current} = ${result}`
    );

    currentInput =
    result.toString();

    operator = "";

    previousInput = "";

    updateDisplay();

}


/* =========================
   CLEAR ALL
========================= */

function clearAll(){

    currentInput = "";

    previousInput = "";

    operator = "";

    updateDisplay();

}


/* =========================
   DELETE LAST CHARACTER
========================= */

function deleteNumber(){

    currentInput =
    currentInput.slice(0,-1);

    updateDisplay();

}


/* =========================
   HISTORY FUNCTION
========================= */

function addToHistory(calculation){

    history.push(calculation);

    renderHistory();

}


/* =========================
   RENDER HISTORY
========================= */

function renderHistory(){

    historyList.innerHTML = "";

    history.forEach((item) => {

        const li =
        document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

}


/* =========================
   CLEAR HISTORY
========================= */

clearHistoryBtn.addEventListener("click", () => {

    history = [];

    renderHistory();

});


/* =========================
   NUMBER BUTTON EVENTS
========================= */

numberButtons.forEach((button) => {

    button.addEventListener("click", () => {

        appendNumber(
            button.dataset.number
        );

    });

});


/* =========================
   OPERATOR BUTTON EVENTS
========================= */

operatorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        chooseOperator(
            button.dataset.operator
        );

    });

});


/* =========================
   EQUAL BUTTON
========================= */

equalButton.addEventListener("click", () => {

    calculate();

});


/* =========================
   ACTION BUTTONS
========================= */

actionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const action =
        button.dataset.action;

        if(action === "clear"){

            clearAll();

        }

        if(action === "delete"){

            deleteNumber();

        }

    });

});


/* =========================
   SCIENTIFIC OPERATIONS
========================= */

scientificButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const action =
        button.dataset.scientific;

        let value =
        parseFloat(currentInput);

        if(isNaN(value)) return;

        switch(action){

            case "sqrt":
                currentInput =
                Math.sqrt(value).toString();
                break;

            case "power":
                currentInput =
                Math.pow(value,2).toString();
                break;

            case "sin":
                currentInput =
                Math.sin(value).toString();
                break;

            case "cos":
                currentInput =
                Math.cos(value).toString();
                break;

            case "tan":
                currentInput =
                Math.tan(value).toString();
                break;

            case "log":
                currentInput =
                Math.log10(value).toString();
                break;

        }

        updateDisplay();

    });

});


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if(!isNaN(key) || key === "."){

        appendNumber(key);

    }

    if(
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ){

        chooseOperator(key);

    }

    if(key === "Enter"){

        calculate();

    }

    if(key === "Backspace"){

        deleteNumber();

    }

    if(key === "Escape"){

        clearAll();

    }

});


/* =========================
   THEME TOGGLE
========================= */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle(
        "dark-mode"
    );

});


/* =========================
   INITIAL DISPLAY
========================= */

updateDisplay();