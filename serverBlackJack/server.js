const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const path = require('path');
const { receiveMessageOnPort } = require('worker_threads');
//const { send } = require('process');
app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.write('hello');
//   res.end();
// });

// app.post('/hit', (req, res) => {
//     console.log(req.body);
//     res.json({command: "Hit"});
// });

// app.post('/stand', (req, res) => {
//     console.log(req.body);
//     res.json({command: "Stand"});
// })

// app.post('/reset', (req, res) => {
//     console.log(req.body);
//     res.json({command:"Reset"});
// })

app.post('/command', (req, res) => {
    if(req.body.command === "hit"){
        //hit logic
        res.json(hit());
    }
    else if(req.body.command === "stand"){
        //stand logic
        res.json(endGame());
    }
    else if(req.body.command === "reset"){
        //reset logic
        res.json(playAgain);
    }
    console.log(req.body);
    // res.json({command:"Reset"});
})



app.listen(port, () => {
    console.log(`BlackJack Server at http://localhost:${port}`)
});




// GAME LOGIC

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
    // displayHand(hand, player);
    console.log(handValue(playerHand));
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
    if (handValue(houseHand) < 17) {
        dealToHand(houseHand, deck, 1, "house");
    }
}

function playAgain() {
    // resetUI();
    resetLogic();
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
            console.log("gay?");
            return endGame();
        }
    }
    return {player:playerHand, dealer:houseHand, playing:playing, status:"no comment"};
}

function earlyWinner() {
    if (handValue(playerHand) >= 21 || handValue(houseHand) >= 21) {
        return endGame();
    }
}

function endGame() {
    // let body = document.body;
    let status = "";
    if (playing === true) {
        let playerScore = handValue(playerHand);
        if (playerScore < 21) {
            housePlay();
        }
        let houseScore = handValue(houseHand);
        // displayHand(houseHand, "house", true);
        if (playerScore <= 21 && (playerScore > houseScore || houseScore > 21)) {
            // addParagraph("result", " Win !! ");
            // body.style.backgroundColor = "rgb(159, 252, 159)";
            playing = false;
            status = "win";
        }
        else if (houseScore <= 21 && houseScore > playerScore) {
            // addParagraph("result", " loss :( ");
            // body.style.backgroundColor = "rgb(253, 122, 129)";
            playing = false;
            status = "loss";
        }
        else if (houseScore <= 21 && playerScore > 21) {
            // addParagraph("result", " bust D: ");
            // body.style.backgroundColor = "rgb(122, 168, 253)";
            playing = false;
            status = "bust";
        }
        else if (houseScore === playerScore) {
            // addParagraph("result", " push :/ ");
            // body.style.backgroundColor = "rgb(216, 122, 253)";
            playing = false;
            status = "push";
        }
        else {
            // addParagraph("result", " ERROR ");
            // body.style.backgroundColor = "rgb(255, 255, 255)";
            playing = false;
            status = "error";
        }
    }
    else {
        console.log("oops");
        status = "oops";
    }
    console.log(playing);

    return {player:playerHand, house:houseHand, plyaying:playing, status:status};
    // button = document.getElementById("playAgain");
    // button.style.visibility = "visible";
}

// playAgain();
// earlyWinner();