let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let spinnerEl = document.getElementById("spinner");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let counter = 0;

spinnerEl.classList.toggle("d-none");


function startCounter() {
    counter += 1;
    timerEl.textContent = counter;
}

let counterValue = setInterval(startCounter, 1000);

function getQuotes() {
    let options = {
        method: "GET"
    };
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");

            let quote = jsonData.content;
            quoteDisplayEl.textContent = quote;
            console.log(jsonData.content);
        });
}

getQuotes();
startCounter();
resetBtnEl.addEventListener("click", function() {
    spinnerEl.classList.remove("d-none");
    getQuotes();
    startCounter();
    counter = 0;
    quoteInputEl.value = "";
    resultEl.textContent = "";
});

submitBtnEl.addEventListener("click", function() {
    spinnerEl.classList.add("d-none");

    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        clearInterval(counterValue);
        resultEl.textContent = "You have typed in " + counter + " seconds";
    } else {
        resultEl.textContent = "You typed Incorrect sentence";
    }
});