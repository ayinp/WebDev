const suits = ["Clubs", "Hearts", "Diamonds", "Spades"];
const ranks = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
let deck = buildDeck();
let playerHand = [];
let houseHand = [];
let playing = true;

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
    for (let i = 0; i < numOfCards; i++) {
        let card = randCard(deck);
        hand.push(card);
    }
    displayHand(hand, player);
    console.log(handValue(playerHand));
}

function setCard(card, id, firstCard) {
    let cardEl = document.createElement("img");
    let cards = document.getElementById(id);
    if (firstCard === true) {
        cardEl.setAttribute("src", "images/backOfCard.png");
        cardEl.setAttribute("alt", "back of card");
    }
    else {
        cardEl.setAttribute("src", ("images/cards/" + card.rank + "Of" + card.suit + ".png"));
        cardEl.setAttribute("alt", card.rank + " of " + card.suit);
    }
    cardEl.setAttribute("style", "width:125px;");
    cardEl.setAttribute("style", "height:175px;");
    cards.appendChild(cardEl);
    return cardEl;
}

// create displayCard functionS

function displayHand(hand, person, showAllCards) {
    if (person === "player") {
        id = "playerHand";
    }
    else {
        id = "houseHand";
    }
    let personEl = document.getElementById(id);
    removeChild(document.getElementById(id));
    console.log(id);
    // HELP WHY HE NO WORKS
    if (!showAllCards) {
        setCard(hand[0], id, id === "houseHand");
        for (let i = 1; i < hand.length; i++) {
            setCard(hand[i], id, false);
        }
    }
    else {
        for (let i = 0; i < hand.length; i++) {
            setCard(hand[i], id, false);
        }
    }

    if (handValue(hand) > 21) {
        personEl.style.backgroundColor = "red";
    }
    else if (handValue(hand) === 21) {
        personEl.style.backgroundColor = "rgb(217, 255, 0)";
    }
}
//after get this working make card flip back over and remove back of card image in endgame

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
    if (handValue(houseHand) < 17) {
        dealToHand(houseHand, deck, 1, "house");
    }
}

function addParagraph(place, msg) {
    let text = document.createElement("p");
    text.textContent = msg;
    let result = document.getElementById(place);
    result.appendChild(text);
}

function endGame() {
    let body = document.body;
    
    if (playing === true) {
        let playerScore = handValue(playerHand);
        if (playerScore < 21) {
            housePlay();
        }
        let houseScore = handValue(houseHand);
        displayHand(houseHand, "house", true);
        // should there be different messages?
        if (playerScore <= 21 && (playerScore > houseScore || houseScore > 21)) {
            addParagraph("result", " Win !! ");
            body.style.backgroundColor = "rgb(159, 252, 159)";
            playing = false;
        }
        else if (houseScore <= 21 && houseScore > playerScore) {
            addParagraph("result", " loss :( ");
            body.style.backgroundColor = "rgb(253, 122, 129)";
            playing = false;
        }
        else if (houseScore <= 21 && playerScore > 21) {
            addParagraph("result", " bust D: ");
            body.style.backgroundColor = "rgb(122, 168, 253)";
            playing = false;
        }
        else if (houseScore === playerScore) {
            addParagraph("result", " push :/ ");
            body.style.backgroundColor = "rgb(216, 122, 253)";
            playing = false;
        }
        else {
            addParagraph("result", " ERROR ");
            body.style.backgroundColor = "rgb(255, 255, 255)";
            playing = false;
        }
    }
    else {
        console.log("oops");
    }

    button = document.getElementById("playAgain");
    button.style.visibility = "visible";
}

function playAgain() {
    resetUI();
    resetLogic();
}

function resetUI() {
    let playerHand = document.getElementById("playerHand");
    let houseHand = document.getElementById("houseHand");
    let result = document.getElementById("result");
    let button = document.getElementById("playAgain");
    let body = document.body;
    removeChild(playerHand);
    removeChild(houseHand);
    removeChild(result);
    console.log("UI RESET, CODE YELLOW");
    button.style.visibility = "hidden";
    body.style.backgroundColor = "rgb(255, 225, 142)";
    playerHand.style.backgroundColor = "orange";
    houseHand.style.backgroundColor = "orange";
}


function removeChild(childHolder) {
    while (childHolder.firstChild) {
        childHolder.removeChild(childHolder.lastChild);
    }
}

function resetLogic() {
    let newDeck = buildDeck();
    deck = newDeck;
    playerHand = [];
    houseHand = [];
    dealToHand(playerHand, deck, 2, "player");
    dealToHand(houseHand, deck, 2, "dealer");
    playing = true;
}

function hit() {
    if (playing === true) {
        dealToHand(playerHand, deck, 1, "player");
        if (handValue(playerHand) >= 21) {
            endGame();
        }
    }
}

function earlyWinner() {
    if (handValue(playerHand) >= 21 || handValue(houseHand) >= 21) {
        endGame();
    }
}



playAgain();
earlyWinner();
console.log(playerHand);
console.log(houseHand);
console.log(handValue(playerHand));
