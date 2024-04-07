// TOTAL HOURS WASTED HERE = 9

var more = document.getElementById("more");
var start = document.getElementById("start");
var start = document.getElementById("try-again");
var score = document.querySelector(".score-status")
var over = document.querySelector(".over")


const available_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const available_spades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const available_hearts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const available_diamond = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const available_clubs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const card_colors = ["hearts", "diamonds", "clubs", "spades"];
var currentsession = []
let sum = 0



var cardLayout = document.createElement("div");
cardLayout.className = "card starter";

var yourSide = document.querySelector(".your-side");

for (var i = 0; i < 2; i++) {
    var clonedCard = cardLayout.cloneNode(true);
    var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
    var randomId = generateRandomId(random_color);
    clonedCard.id = randomId;
    clonedCard.classList.add("" + random_color + "-" + randomId);
    yourSide.appendChild(clonedCard);
    sum += randomId;
    sum_checker();
}

function generateRandomId(random_color) {
    var randomIndex;
    if (random_color === "spades") {
        randomIndex = Math.floor(Math.random() * available_spades.length);
        if (available_spades.length === 1) {
            return available_spades.pop();
        } else {
            return available_spades.splice(randomIndex, 1)[0];
        }
    } else if (random_color === "clubs") {
        randomIndex = Math.floor(Math.random() * available_clubs.length);
        if (available_clubs.length === 1) {
            return available_clubs.pop();
        } else {
            return available_clubs.splice(randomIndex, 1)[0];
        }
    } else if (random_color === "diamonds") {
        randomIndex = Math.floor(Math.random() * available_diamond.length);
        if (available_diamond.length === 1) {
            return available_diamond.pop();
        } else {
            return available_diamond.splice(randomIndex, 1)[0];
        }
    } else if (random_color === "hearts") {
        randomIndex = Math.floor(Math.random() * available_hearts.length);
        if (available_hearts.length === 1) {
            return available_hearts.pop();
        } else {
            return available_hearts.splice(randomIndex, 1)[0];
        }
    }
    let index_value = randomIndex
    return index_value
}

function addCard() {
    var clonedCard = cardLayout.cloneNode(true);
    var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
    console.log(random_color)
    var randomId = generateRandomId(random_color); // Pass random_color to generateRandomId()
    clonedCard.id = randomId;
    clonedCard.classList.add("" + random_color + "-" + randomId);
    yourSide.appendChild(clonedCard);
    sum += randomId;
    sum_checker();
}


function sum_checker() {
    score.textContent = sum;
    // console.log(sum)
    if (sum === 21) console.log("GG")
    else if (sum > 21) {
        gameover()
        over.style.display = "flex";
    }
}

function gameover() {
    while (yourSide.firstChild) {
        yourSide.removeChild(yourSide.firstChild);
    }
    setTimeout(function() {
        sum = 0
        score.textContent = sum;
        for (var i = 0; i < 2; i++) {
            var clonedCard = cardLayout.cloneNode(true);
            var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
            var randomId = generateRandomId(random_color);
            clonedCard.id = randomId;
            clonedCard.classList.add("" + random_color + "-" + randomId);
            available_numbers.splice(available_numbers.indexOf(randomId), 1);
            yourSide.appendChild(clonedCard);
            sum += randomId;
            sum_checker();
            over.style.display = "none";

        }
    }, 1500); // 3000 milliseconds = 3 seconds
}


more.addEventListener("click", addCard);
start.addEventListener("click", gameover)