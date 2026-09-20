const symbols = [
    "🍎", "🚀", "🐱", "🌟",
    "🎵", "⚽", "🌈", "🍕"
];

let cards = [...symbols, ...symbols];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let pairs = 0;

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function createCards() {

    const cardContainer = document.getElementById("cards");

    cardContainer.innerHTML = "";

    cards.forEach((symbol) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = "?";

        card.dataset.symbol = symbol;

        card.addEventListener("click", flipCard);

        cardContainer.appendChild(card);
    });
}

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (this.classList.contains("matched")) return;

    this.classList.add("flipped");

    this.innerHTML = this.dataset.symbol;

    if (firstCard === null) {

        firstCard = this;
        return;
    }

    secondCard = this;

    moves++;

    document.getElementById("moves").innerText = moves;

    checkMatch();
}

function checkMatch() {

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        pairs++;

        document.getElementById("pairs").innerText = pairs;

        resetCards();

        if (pairs === symbols.length) {

            document.getElementById("message").innerText =
                "🎉 Congratulations! You won!";
        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard.innerHTML = "?";
            secondCard.innerHTML = "?";

            resetCards();

        }, 800);
    }
}

function resetCards() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartGame() {

    moves = 0;
    pairs = 0;

    document.getElementById("moves").innerText = "0";
    document.getElementById("pairs").innerText = "0";
    document.getElementById("message").innerText = "";

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    cards = [...symbols, ...symbols];

    shuffleCards();
    createCards();
}

document.getElementById("restart")
    .addEventListener("click", restartGame);

shuffleCards();
createCards();