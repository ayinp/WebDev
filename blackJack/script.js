const suits = ["Clubs", "Hearts", "Diamonds", "Spades"];
const ranks = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
let deck = buildDeck();
let playerHand = [];
let houseHand = [];

function buildDeck (){
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

function dealToHand(hand, deck, numOfCards, player){
    let card = [];
    for(let i = 0; i < numOfCards; i++){
        card = [randCard(deck)];
        hand.push(card[0]);
        displayHand(card, player);
    }
}

function displayHand(hand, person){ /*1 = player, 0 = dealer */
    if(person === "player")
    {
        id = "playerHand";
    }
    else{
        id = "houseHand";
    }
        console.log(id);
    for(let i = 0; i < hand.length; i++)

    {
        let card = document.createElement("img");
        card.setAttribute("src", ("images/cards/" + hand[i].rank + "Of" + hand[i].suit + ".png"));
        card.setAttribute("alt", hand[i].rank + " of " + hand[i].suit);
        card.setAttribute("style", "width:125px;");
        card.setAttribute("style", "height:175px;")
        let cards = document.getElementById(id);
        cards.appendChild(card);
    }
}



dealToHand(playerHand, deck, 2, "player");
dealToHand(houseHand, deck, 2, "dealer");
console.log(playerHand);
console.log(houseHand);