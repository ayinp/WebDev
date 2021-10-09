function setCard(card, id, firstCard) {
    console.log(card);
    console.log(id);
    console.log(firstCard);
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

    // if (handValue(hand) > 21) {
    //     personEl.style.backgroundColor = "red";
    // }
    // else if (handValue(hand) === 21) {
    //     personEl.style.backgroundColor = "rgb(217, 255, 0)";
    // }
}

function addParagraph(place, msg) {
    let text = document.createElement("p");
    text.textContent = msg;
    let result = document.getElementById(place);
    result.appendChild(text);
}

function playAgain() {
    resetUI();
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

function start() {
    fetch('/command', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({
        // your expected POST request payload goes here
        command: "reset"
        })
    })
    .then(res => res.json())
    .then(game => {
        // enter you logic when the fetch is successful
        console.log(game)
        displayHand(game.playerHand, "player", true);
        displayHand(game.houseHand, "house", false);
    })
    .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
        console.log(error)
    })  
}

function hit(){
    fetch('/command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
            // your expected POST request payload goes here
            command: "hit"
            })
        })
        .then(res => res.json())
        .then(game => {
            // enter you logic when the fetch is successful
            console.log(game)
            displayHand(game.playerHand, "player", true);
            displayHand(game.houseHand, "house", false);
        })
        .catch(error => {
        // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })  
}

function stand(){
    fetch('/command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
            // your expected POST request payload goes here
            command: "stand"
            })
        })
        .then(res => res.json())
        .then(game => {
            // enter you logic when the fetch is successful
            console.log(game)
            displayHand(game.playerHand, "player", true);
            displayHand(game.houseHand, "house", false);
        })
        .catch(error => {
        // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })  
}

start();