// TOTAL HOURS WASTED HERE = 29
// DEBUGGING = 16

//////////////////////////////////////////////////
///                                            ///
///                 VARIABLES                  ///
///                                            ///
//////////////////////////////////////////////////

var more = document.getElementById("more");
var start = document.getElementById("start");
var restart = document.getElementById("try-again");
var dealerSam = document.getElementById("dealer-button");
var guide = document.getElementById("guide");
// var reset = document.getElementById("reset");
var bodyElement = document.body;

var messages = document.querySelector(".alertos")
var messagesHeader = document.querySelector(".alert-context")
var messagesImage = document.getElementById("alert-icon")


var playerScore = document.querySelector(".player-score")
var dealerScore = document.querySelector(".dealer-score")
var playerBet = document.querySelector(".player-bet")
var dealerBet = document.querySelector(".dealer-bet")
var alterMessage = document.querySelector(".alert-context")
var PunctBa = document.querySelector(".punct")

// var noCredits = alterMessage.textContent = "No Credits";
// var playerWin = alterMessage.textContent = "Player wins";
// var dealerWin = alterMessage.textContent = "Dealer wins";
// var draw = alterMessage.textContent = "Draw";


var playerBalance = document.querySelector(".player-balance")
var dealerBalance = document.querySelector(".dealer-balance")
var over = document.querySelector(".over")

const available_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14];
const available_spades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14];
const available_hearts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14];
const available_diamond = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14];
const available_clubs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14];
const card_colors = ["hearts", "diamonds", "clubs", "spades"];


var betButtons = {
    bet1: document.getElementById('bet-1'),
    bet10: document.getElementById('bet-10'),
    bet100: document.getElementById('bet-100'),
    bet200: document.getElementById('bet-200')
};

var unBetButtons = {
    unBet1: document.getElementById('un-bet-1'),
    unBet10: document.getElementById('un-bet-10'),
    unBet100: document.getElementById('un-bet-100'),
    unBet200: document.getElementById('un-bet-200')
};



const dealer_rng = [2, 3, 4];
var currentsession = 0
var dealer_goal = 0
var roundSTARTED = 0
current_ace_rate = 0

var yourSide = document.querySelector(".your-side");
var dealerSide = document.querySelector(".dealer-side");

var cardLayout = document.createElement("div");
cardLayout.className = "card starter";

let sum = 0
let dealer_sum = 0
let playerBetValue = 0
let DealerBetValue = 0

var InputUser = 0


//////////////////////////////////////////////////
///                                            ///
///                 SHUFFLING                  ///
///                                            ///
//////////////////////////////////////////////////

function shuffle(){
    if(playerBet.textContent==0) {
        var value= "broke";
        alerts(value);
    }
    else if(playerBalance.textContent < 0) {
        var value= "nocredits";
        alerts(value);
    }
    // else if(playerBet.textContent > playerBalance.textContent) {
    //     var value= "nocredits";
    //     alerts(value);
    // }
    else {
    for (var i = 0; i < 2; i++) {
        yourSide.style.boxShadow = "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px";
        // dealerSide.style.boxShadow = "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px";
        var PlayerClone = cardLayout.cloneNode(true);
        var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
        var randomId = generateRandomId(random_color);
        PlayerClone.id = randomId;
        PlayerClone.classList.add("" + random_color + "-" + randomId);
        yourSide.appendChild(PlayerClone);
        if (randomId > 11) {
            sum += 10;
        } else if (sum == 0 && (randomId == 1 || randomId == 11)) {
            sum += 11;
        } else if (sum <= 10 && (randomId == 1 || randomId == 11)) {
            sum += 11;
        } else if (sum >= 11 && (randomId == 1 || randomId == 11)) {
            sum += 1;
        } else {
            sum += randomId;
        }
    }
    sum_checker();
    for (var i = 0; i < 2; i++) {
        var DealerClone = cardLayout.cloneNode(true);
        var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
        var randomId = generateRandomId(random_color);
        DealerClone.id = randomId;
        DealerClone.classList.add("" + random_color + "-" + randomId);
        dealerSide.appendChild(DealerClone);
        if (randomId > 11) {
                dealer_sum += 10;
        } else if (dealer_sum == 0 && (randomId == 1 || randomId == 11)) {
                dealer_sum += 11;
        } else if (dealer_sum <= 10 && (randomId == 1 || randomId == 11)) {
                dealer_sum += 11;
        } else if (dealer_sum >= 11 && (randomId == 1 || randomId == 11)) {
                dealer_sum += 1;
        } else {
                dealer_sum += randomId;
        }
    }
    dealer_checker();

    more.style.display = "flex";
    dealerSam.style.display = "flex";
    start.style.display = "none";
    guide.style.display = "none";
    roundSTARTED = 1
}   
}

//////////////////////////////////////////////////
///                                            ///
///              PLAYER'S SIDE                 ///
///                                            ///
//////////////////////////////////////////////////

function generateRandomId(random_color) {
    var randomIndex;
    if(available_clubs.length <= 2 && available_diamond.length <= 2 && available_hearts.length <= 2 && available_spades.length <= 2 ) location.reload();
    if (random_color === "spades") {
        if(available_spades.length === 0) {
            available_spades.splice(available_spades.indexOf('spades'), 1)
            var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
            return generateRandomId(random_color);
        }
        else if (available_spades.length === 1) {
            return available_spades.pop();
        } else {
            randomIndex = Math.floor(Math.random() * available_spades.length);
            return available_spades.splice(randomIndex, 1)[0];
        }
    } else if (random_color === "clubs") {
        if(available_clubs.length === 0) {
            available_clubs.splice(available_clubs.indexOf('clubs'), 1)
            var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
            return generateRandomId(random_color);
        }
        else if (available_clubs.length === 1) {
            return available_clubs.pop();
        } else {
            randomIndex = Math.floor(Math.random() * available_clubs.length);
            return available_clubs.splice(randomIndex, 1)[0];
        }
    } else if (random_color === "diamonds") {
        if(available_diamond.length === 0) {
            available_diamond.splice(available_diamond.indexOf('diamond'), 1)
            var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
            return generateRandomId(random_color);
        }
        else if (available_diamond.length === 1) {
            return available_diamond.pop();
        } else {
            randomIndex = Math.floor(Math.random() * available_diamond.length);
            return available_diamond.splice(randomIndex, 1)[0];
        }
    } else if (random_color === "hearts") {
        if(available_hearts.length === 0) {
            available_hearts.splice(available_hearts.indexOf('hearavailable_hearts'), 1)
            var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
            return generateRandomId(random_color);
        }
        else if (available_hearts.length === 1) {
            return available_hearts.pop();
        } else {
            randomIndex = Math.floor(Math.random() * available_hearts.length);
            return available_hearts.splice(randomIndex, 1)[0];
        }
    }
    let index_value = randomIndex
    return index_value
}

function addCard() {
    InputUser++
    var PlayerClone = cardLayout.cloneNode(true);
    var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
    var randomId = generateRandomId(random_color); // Pass random_color to generateRandomId()
    PlayerClone.id = randomId;
    // console.log(random_color, "-", randomId)
    PlayerClone.classList.add("" + random_color + "-" + randomId);
    yourSide.appendChild(PlayerClone);
    if (randomId > 11) {
        sum += 10;
    } else if (sum == 0 && (randomId == 1 || randomId == 11)) {
        sum += 11;
    } else if (sum <= 10 && (randomId == 1 || randomId == 11)) {
        sum += 11;
    } else if (sum > 11 && (randomId == 1 || randomId == 11)) {
        sum += 1;
    } else {
        sum += randomId;
    }
    sum_checker();
    if (yourSide.style.minHeight > dealerSide.style.minHeight) {
        dealerSide.style.minHeight = yourSide.clientHeight + "px";
    }
}

function sum_checker() {
    playerScore.textContent = sum;
    
    console.log("D/P", dealer_sum, "=", sum)
    if((InputUser>=5) || (sum>=21)) more.disabled = true

    if (isNaN(sum)) {
        window.close();
    }
    if(sum == 21 ) {
        var currentBalance = parseInt(playerBalance.textContent.replace(",", ""));
        var currentDealerBalance = parseInt(dealerBalance.textContent.replace(",", ""));
        var winningAmount = parseInt(dealerBet.textContent.replace(",", ""));
        var newBalance = currentBalance + winningAmount;
        var newDealerBalance = currentDealerBalance - winningAmount;
        playerBalance.textContent = newBalance.toLocaleString();
        dealerBalance.textContent = newDealerBalance.toLocaleString();
        var value = "player"
    }
    else if ((sum > 21)) {
        var currentBalance = parseInt(playerBalance.textContent.replace(",", ""));
        var winningAmount = parseInt(dealerBet.textContent.replace(",", ""));
        var newBalance = currentBalance - winningAmount;
        
        playerBalance.textContent = newBalance.toLocaleString();
        var currentBalance = newBalance
        var currentDealerBalance = parseInt(dealerBalance.textContent.replace(",", ""));
        var zeroBalance = parseInt(playerBalance.textContent.replace(",", ""));
        if(zeroBalance===1) PunctBa.textContent == "punct"
        if(zeroBalance===0) {
            value = "bye"
        }
        // gameover();
        // over.style.display = "flex";
        var value = "dealer"
    } 
    else if(sum==dealer_sum) {
        value=="draw"
    }

    alerts(value)
}


//////////////////////////////////////////////////
///                                            ///
///               DEALER'S SIDE                ///
///                                            ///
//////////////////////////////////////////////////

function dealer_checker() {
    dealerScore.textContent = dealer_sum;
    console.log("D/P", dealer_sum, "=", sum)
    if(InputUser>=1) {
        dealerSam.disabled = true
    }
    if (dealer_sum > 21) {
        var currentBalance = parseInt(playerBalance.textContent.replace(",", ""));
        var currentDealerBalance = parseInt(dealerBalance.textContent.replace(",", ""));
        var winningAmount = parseInt(dealerBet.textContent.replace(",", ""));
        var newBalance = currentBalance + winningAmount;
        var newDealerBalance = currentDealerBalance - winningAmount;
        playerBalance.textContent = newBalance.toLocaleString();
        dealerBalance.textContent = newDealerBalance.toLocaleString();
        console.log(currentBalance,"+", winningAmount,"=", newBalance) 
        value = "player"
    } 
    else if (dealer_sum == 21) {
        var currentBalance = parseInt(playerBalance.textContent.replace(",", ""));
        var winningAmount = parseInt(dealerBet.textContent.replace(",", ""));
        var newBalance = currentBalance - winningAmount;
        
        playerBalance.textContent = newBalance.toLocaleString();
        console.log(currentBalance,"-", winningAmount,"=", newBalance) 
        var zeroBalance = parseInt(playerBalance.textContent.replace(",", ""));
        if(zeroBalance===1) PunctBa.textContent == "punct"
        if(zeroBalance===0) {
            value = "bye"

        }
        // gameover();
        // over.style.display = "flex";
        var value = "dealer"
    } 
    else if (sum === dealer_sum) {
        value = "draw"
    }
    else if ((dealer_sum < 21) && currentsession == 1) {
        if (sum < dealer_sum) {
            var currentBalance = parseInt(playerBalance.textContent.replace(",", ""));
            var winningAmount = parseInt(dealerBet.textContent.replace(",", ""));
            var newBalance = currentBalance - winningAmount;
            
            playerBalance.textContent = newBalance.toLocaleString();
            console.log(currentBalance,"-", winningAmount,"=", newBalance) 
            var zeroBalance = parseInt(playerBalance.textContent.replace(",", ""));
            if(zeroBalance===1) PunctBa.textContent == "punct"
            if(zeroBalance===0) {
                value = "bye"
    
            }
            // gameover();
            // over.style.display = "flex";
            var value = "dealer"

        } 
        else if (sum > dealer_sum) {
            var currentBalance = parseInt(playerBalance.textContent.replace(",", ""));
            var currentDealerBalance = parseInt(dealerBalance.textContent.replace(",", ""));
            var winningAmount = parseInt(dealerBet.textContent.replace(",", ""));
            var newBalance = currentBalance + winningAmount;
            var newDealerBalance = currentDealerBalance - winningAmount;
            playerBalance.textContent = newBalance.toLocaleString();
            console.log(currentBalance,"-", winningAmount,"=", newBalance) 
            // dealerBalance.textContent = newDealerBalance.toLocaleString();
            value = "player"
        } 
        else if (sum == dealer_sum) {
            value == "draw"

        }
    }
    alerts(value)
}

function dealer_turn() {
    more.disabled = true
    currentsession = 1
    var dealer_goal = dealer_rng[Math.floor(Math.random() * dealer_rng.length)];
    current_dealer_cards = 2

    while (dealer_sum < 17) {
        InputUser++
        var DealerClone = cardLayout.cloneNode(true);
        var random_color = card_colors[Math.floor(Math.random() * card_colors.length)];
        var randomId = generateRandomId(random_color); // Pass random_color to generateRandomId()
        DealerClone.id = randomId;
        // console.log(random_color, "-", randomId)
        DealerClone.classList.add("" + random_color + "-" + randomId);
        dealerSide.appendChild(DealerClone);
        if (randomId > 11) {
            dealer_sum += 10;
        } else if (dealer_sum == 0 && (randomId == 1 || randomId == 11)) {
            dealer_sum += 11;
        } else if (dealer_sum <= 10 && (randomId == 1 || randomId == 11)) {
            dealer_sum += 11;
        } else if (dealer_sum > 11 && (randomId == 1 || randomId == 11)) {
            dealer_sum += 1;
        } else {
            dealer_sum += randomId;
        }
        dealer_checker();
        current_dealer_cards++;
        if (dealerSide.style.minHeight > yourSide.style.minHeight) {
            yourSide.style.minHeight = dealerSide.clientHeight + "px";
        }
    }
    if(current_dealer_cards===2){
        InputUser++
        dealer_checker()
    }  
    // console.log("dealer_sum:", dealer_sum)

}


//////////////////////////////////////////////////
///                                            ///
///               END GAME SIDE                ///
///                                            ///
//////////////////////////////////////////////////


function reset_game() {
    kmsatp = parseInt(dealerBalance.textContent.replace(",", ""));
    if(kmsatp<=0) alerts("pa")
    
    console.log("-----------------------------")
    while (yourSide.firstChild) {
        yourSide.removeChild(yourSide.firstChild);
    }
    while (dealerSide.firstChild) {
        dealerSide.removeChild(dealerSide.firstChild);
        over.style.display = "flex";
        // bodyElement.style.overflow = "hidden"
    }
    dealerSide.style.minHeight = yourSide.clientHeight + "px";
    over.style.display = "none";
    bodyElement.style.overflow = "auto"
    sum = 0;
    dealer_sum = 0
    playerBetValue = 0
    DealerBetValue = 0
    currentsession = 0
    roundSTARTED = 0;
    InputUser = 0

    playerBet.textContent = 0;
    dealerBet.textContent = 0;

    playerScore.textContent = sum;
    dealerScore.textContent = sum;

    messagesImage.removeAttribute("class");

    messages.style.display = "none";
    yourSide.style.boxShadow = "none";
    dealerSide.style.boxShadow = "none";

    more.style.display = "none";
    dealerSam.style.display = "none";
    start.style.display = "flex";
    guide.style.display = "flex";

    more.disabled = false
    dealerSam.disabled = false

}

var value
function alerts(value) {
    if(value=="player") {
        messages.style.display = "flex";
        messagesHeader.textContent = "Ai castigat";
        messagesImage.classList.add("player-win");
    }
    else if(value=="dealer") {
        messagesImage.classList.add("dealer-win");
        messages.style.display = "flex";
        messagesHeader.textContent = "Dealer-ul castiga";
    }
    else if(value=="draw"){
        messagesImage.classList.add("draw");
        messagesHeader.textContent = "Remiza";
        messages.style.display = "flex";
    }
    else if(value=="nocredits") {
        messagesHeader.textContent = "Nu ai suficiente puncte";
        messagesImage.classList.add("no-credits");
        messages.style.display = "flex";
    }
    else if(value=="broke") {
        messagesHeader.textContent = "Nu ai suficiente puncte";
        messagesImage.classList.add("no-credits");
        messages.style.display = "flex";
    }
    else if(value=="bye") {
        messagesHeader.textContent = "Revino mai tarziu, nu mai ai puncte";
        messagesImage.classList.add("no-credits");
        messages.style.display = "flex";
    }
    else if (value=="pa") window.close();
}
//////////////////////////////////////////////////
///                                            ///
///               BETTING BOYSSS               ///
///                                            ///
//////////////////////////////////////////////////

function addToBet(amount) {
    var currentBalance = parseInt(playerBalance.textContent.replace(",", ""));
    if (roundSTARTED == 0) {
        playerBetValue += amount;
        if (playerBetValue > currentBalance) {
            playerBetValue = currentBalance;
            playerBet.textContent = playerBetValue;
            dealerBet.textContent = playerBetValue;
            console.log(playerBet.textContent, "=", dealerBet.textContent)
        } else {
            playerBet.textContent = playerBetValue;
            dealerBet.textContent = playerBetValue;
            console.log(playerBet.textContent, "=", dealerBet.textContent)
        }
    } else {
        console.log("No");
    }
}

// Function to handle click on each bet button
function handleBetButtonClick(amount) {
    return function() {
        addToBet(amount);
    };
}

// Assign click event handlers to each bet button
betButtons.bet1.addEventListener('click', handleBetButtonClick(1));
betButtons.bet10.addEventListener('click', handleBetButtonClick(10));
betButtons.bet100.addEventListener('click', handleBetButtonClick(100));
betButtons.bet200.addEventListener('click', handleBetButtonClick(200));

// Function to subtract the specified amount from playerBet
// Function to subtract the specified amount from playerBet
function removeFromBet(amount) {
    var currentBalance = parseInt(playerBalance.textContent.replace(",", ""));
    if (roundSTARTED == 0) {
        if (playerBetValue >= amount) { // Check if there's enough balance to remove
            playerBetValue -= amount;
            if (playerBet <= 0) {
                playerBetValue = 0;
                playerBet.textContent = 0;
                dealerBet.textContent = 0;
                console.log(playerBet.textContent, "=", dealerBet.textContent)
            } else {
                playerBet.textContent = playerBetValue;
                dealerBet.textContent = playerBetValue;
                console.log(playerBet.textContent, "=", dealerBet.textContent)
            }
        } else {
            playerBetValue = 0;
            playerBet.textContent = 0;
            dealerBet.textContent = 0;
        }
    } else {
        console.log("No");
    }
}
// Function to handle click on each un-bet button
function handleUnBetButtonClick(amount) {
    return function() {
        removeFromBet(amount);
    };
}

// Assign click event handlers to each un-bet button
unBetButtons.unBet1.addEventListener('click', handleUnBetButtonClick(1));
unBetButtons.unBet10.addEventListener('click', handleUnBetButtonClick(10));
unBetButtons.unBet100.addEventListener('click', handleUnBetButtonClick(100));
unBetButtons.unBet200.addEventListener('click', handleUnBetButtonClick(200));


//////////////////////////////////////////////////
///                                            ///
///                    YES                     ///
///                                            ///
//////////////////////////////////////////////////

more.addEventListener("click", addCard);
start.addEventListener("click", shuffle);
restart.addEventListener("click", reset_game)
// dealerSam.addEventListener("click", dealer_turn)
dealerSam.addEventListener("click", function() {
    InputUser = 0
    dealer_turn();
});
