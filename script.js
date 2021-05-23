const game = {
    currentKeyword: [], //tablica znakow obecnego keywordu
    currentLetter: null, //obecna literka
    attempts: 5,
    elemSentence: document.querySelector(".keyword"), //element z hasłem do zgadnięcia
    elemAttempts: document.querySelector(".attempts"), //element z liczba prob
    elemLetters: document.querySelector(".letter-board"), //lista z literkami do klikania
    keywords: ["money", "rectangle", "flower", "cucumber", "horse", "carpet"],


    generateLetters() { //generujemy tablicę z literkami, które zostaną uzyte do utworzenia przycisków
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
        alphabet.forEach(letter => {
            const button = document.createElement("button");
            button.classList.add("letter-tile");
            button.type = "button";
            button.dataset.letter = letter;
            button.innerText = letter;
            this.elemLetters.appendChild(button);
        });
    },

    disableYourTile() { //sprawdza czy kafelek zawiera klase letter-tile. Jesli tak, to go wyłącza
        this.elemLetters.addEventListener("click", e => {
            if (e.target.classList.contains("letter-tile")) {
                const letter = e.target.dataset.letter;
                console.log(letter);
                e.target.disabled = true;
            }
        })
    },

    showGame() { //aktywuje elementy gry po kliknięciu na start
        let click = 0;
        const btnStart = document.querySelector(".start");
        btnStart.addEventListener("click", e => {
            if (click !== 0) {
                location.reload(true);
            }
            btnStart.textContent = "Try again";
            this.elemAttempts.style.display = "flex";
            this.elemLetters.style.display = "flex";
            this.elemSentence.style.display = "flex";
            click++;
        })
    },

    randomKeyword() { //losuje słowo z puli
        const keyword = Math.floor(Math.random() * (this.keywords.length - 1) + 1);
        return this.keywords[keyword];
    },

    generateKeywordBars() { //tworzy pola keywordu
        const tabOfLetters = this.randomKeyword().split('');
        this.currentKeyword = tabOfLetters;
        tabOfLetters.forEach(letter => {
            const tile = document.createElement("div");
            tile.classList.add("letter-tile");
            tile.classList.add("keyword-tile");
            tile.dataset.letter = letter;
            tile.innerText = letter; //bylo letter
            this.elemSentence.appendChild(tile);
            this.currentLetter = tile;
        })
    },

    verifyYourGuess() { //sprawdza czy kafelek z puli do strzelania, który kliknęliśmy jest w haśle - jeśli tak, to dodaje do hasła i pokazuje wszystkie jego powtórzenia, jeśli nie to nalicza próby nietrafione
        this.elemLetters.addEventListener("click", e => {
            if (this.currentKeyword.includes(e.target.dataset.letter) === true) {
                let index = this.currentKeyword.indexOf(e.target.dataset.letter);
                const t = document.querySelectorAll(".keyword-tile");
                t.forEach(letter => {
                    // this.currentLetter.innerText = this.currentLetter.dataset.letter;
                })
                console.log(index);
                this.currentKeyword.splice(index, 1);
                if (this.currentKeyword.length === 0) {
                    this.gameComplete();
                }
            } else {
                const attemptsCounter = document.querySelector(".counter");
                this.attempts--;
                console.log('gowno');
                attemptsCounter.innerText = this.attempts;
                if (this.attempts === 0) {
                    this.gameOver();
                    this.startGame();
                }
            }
        })
    },

    disableAllLetters() {
        const letters = this.elemLetters.querySelectorAll('.letter-tile');
        letters.forEach(letter => letter.disabled = true);
    },

    enableAllLetters() {
        const letters = this.elemLetters.querySelectorAll('.letter-tile');
        letters.forEach(letter => letter.disabled = false);
    },

    gameOver() {
        alert("You lose.");
        this.disableAllLetters();
    },

    gameComplete() {
        alert("You won!");
        this.disableAllLetters();
    },

    initBoard() {
        this.generateLetters();
        this.disableYourTile();
    },

    startGame() {
        this.attempts = 5;
        this.showGame();
        this.showAttemps();
    },
};

game.initBoard();
game.showGame();
game.randomKeyword();
game.generateKeywordBars();
game.verifyYourGuess();
