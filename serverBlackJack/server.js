const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const path = require('path');
const { receiveMessageOnPort } = require('worker_threads');
//const { send } = require('process');
app.use('/', express.static(path.join(__dirname, 'public')));
var session = require('express-session');

// Use the session middleware
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
    if (req.session.game === undefined) {
        let deck = buildDeck();
        let playerHand = [];
        dealToHand(playerHand, deck, 2);
        let houseHand = [];
        dealToHand(houseHand, deck, 2);
        let playing = true;
        let status = "";

        req.session.game = {deck: deck, playerHand: playerHand, houseHand: houseHand, playing: playing, status: status};
    }
    next();
});


app.post('/command', (req, res) => {
    if (req.body.command === "hit") {
        //hit logic
        res.json(hit(req.session.game));
    }
    else if (req.body.command === "stand") {
        //stand logic
        res.json(endGame(req.session.game));
    }
    else if (req.body.command === "reset") {
        //reset logic
        res.json(playAgain(req.session.game));
    }
    // res.json({command:"Reset"});
})



app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});




// GAME LOGIC

const suits = ["Clubs", "Hearts", "Diamonds", "Spades"];
const ranks = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

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

function dealToHand(hand, deck, numOfCards, /*player*/) {
    for (let i = 0; i < numOfCards; i++) {
        let card = randCard(deck);
        hand.push(card);
    }
    // displayHand(hand, player);
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

function housePlay(game) {
    if (handValue(game.houseHand) < 17) {
        dealToHand(game.houseHand, game.deck, 1);
    }
}

function playAgain(game) {
    // resetUI();
    return resetLogic(game);
}

function resetLogic(game) {
    let newDeck = buildDeck();
    game.deck = newDeck;
    game.playerHand = [];
    game.houseHand = [];
    dealToHand(game.playerHand, game.deck, 2, "player");
    dealToHand(game.houseHand, game.deck, 2, "dealer");
    game.playing = true;
    return game;
}

function hit(game) {
    if (game.playing === true) {
        dealToHand(game.playerHand, game.deck, 1, "player");
        if (handValue(game.playerHand) >= 21) {
            return endGame(game);
        }
    }
    return { playerHand: game.playerHand, houseHand: game.houseHand, playing: game.playing, status: "no comment" };
}

function earlyWinner(game) {
    if (handValue(playerHand) >= 21 || handValue(houseHand) >= 21) {
        return endGame(game);
    }
}

function endGame(game) {
    // let body = document.body;
    console.log("endgame??");
    let status = "";
    if (game.playing === true) {
        let playerScore = handValue(game.playerHand);
        if (playerScore < 21) {
            housePlay(game);
        }
        let houseScore = handValue(game.houseHand);
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
        status = "oops";
    }
    let goose = { playerHand: game.playerHand, houseHand: game.houseHand, plyaying: playing, status: status };
    resetLogic(game);
    return goose;
    // button = document.getElementById("playAgain");
    // button.style.visibility = "visible";
}

// playAgain();
// earlyWinner();