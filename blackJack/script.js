const suits = ["Clubs", "Hearts", "Diamonds", "Spades"];
const ranks = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
let deck = buildDeck();
let playerHand = [];
let houseHand = [];

function buildDeck() {
    let deck = [];
    for (const r of ranks) {
        for (const s of suits) {
            deck.push({ rank: r, suit: s });
        }
    }
    return deck;
}

console.log(deck[1].rank, "of", deck[1].suit);


function randCard(deck) {
    let i = Math.floor(Math.random() * deck.length);
    let card = deck[i];
    deck.splice(i, 1);
    return card;
}

function dealToHand(hand, deck, numOfCards, player) {
    let card = [];
    for (let i = 0; i < numOfCards; i++) {
        card = [randCard(deck)];
        hand.push(card[0]);
        displayHand(card, player);
    }
    console.log(handValue(playerHand));
}

function displayHand(hand, person) { /*1 = player, 0 = dealer */
    if (person === "player") {
        id = "playerHand";
    }
    else {
        id = "houseHand";
    }
    console.log(id);
    for (let i = 0; i < hand.length; i++) {
        let card = document.createElement("img");
        card.setAttribute("src", ("images/cards/" + hand[i].rank + "Of" + hand[i].suit + ".png"));
        card.setAttribute("alt", hand[i].rank + " of " + hand[i].suit);
        card.setAttribute("style", "width:125px;");
        card.setAttribute("style", "height:175px;");
        let cards = document.getElementById(id);
        cards.appendChild(card);
    }
}

function cardValue(card) {
    return Math.min(ranks.indexOf(card.rank) + 1, 10);
}

function handValue(hand) {
    let score = 0;
    let hasAce = false;
    for (let card of hand) {
        if (cardValue(card) === 1) {
            hasAce = true;
        }
        score = score + cardValue(card);
    }

    if (hasAce && score < 12) {
        score += 10;
    }

    return score;
}

function housePlay() {
    if (handValue(houseHand) < 15) {
        dealToHand(houseHand, deck, 1, "house");
    }
}

function printWinOrLoss(win) {
    let text = document.createElement("p");
    if (win) {
        text.textContent = " win!! ";
    }
    else if (!win) {
        text.textContent = " loss :( ";
    }
    let result = document.getElementById("result");
    result.appendChild(text);
}

function endGame() {
    housePlay();
    let houseScore = handValue(houseHand);
    let playerScore = handValue(playerHand);
    let win = false;
    if (playerScore <= 21 && (playerScore > houseScore || houseScore > 21)) {
        // window.location.href = "win.html";
        win = true;
    }
    else if (houseScore <= 21 && (houseScore > playerScore || playerScore > 21)) {
        // window.location.href = "loss.html"
        win = false;
    }
    else if (houseScore === playerScore || (houseScore > 21 && playerScore > 21)) {
        let x = Math.floor(Math.random() * 2)
        if (x > 1) {
            // window.location.href = "win.html";
            win = true;
        }
        else {
            // window.location.href = "loss.html";
            win = false;
        }
    }
    printWinOrLoss(win);
    resetUI();
    resetLogic();
}

function resetUI(){
    let playerHand = document.getElementById("playerHand");
    let houseHand = document.getElementById("houseHand");
    removeChild(playerHand);
    removeChild(houseHand);
    console.log("UI RESET, CODE RED");
}


function removeChild(childHolder){
    while(childHolder.firstChild){
        childHolder.removeChild(childHolder.lastChild);
    }
}

function resetLogic(){
    let newDeck = buildDeck();
    deck = newDeck;
    playerHand = [];
    houseHand = [];
    dealToHand(playerHand, deck, 2, "player");
    dealToHand(houseHand, deck, 2, "dealer");
}

function hit() {
    dealToHand(playerHand, deck, 1, "player");
    if (handValue(playerHand) > 21) {
        endGame();
    }
}



dealToHand(playerHand, deck, 2, "player");
dealToHand(houseHand, deck, 2, "dealer");
console.log(playerHand);
console.log(houseHand);
console.log(handValue(playerHand));
