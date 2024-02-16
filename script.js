const handBtns = document.querySelectorAll('.hand');
const rock = document.getElementById('rock');
const showUserPicked = document.querySelector('.userPicked');
const showHousePicked = document.querySelector('.housePicked');
const btnsContainer = document.querySelector('.btnsContainer');
const winnerContainer = document.querySelector('.winnerCont');
const rulesBtn = document.getElementById('rulesBtn');
const overlay_rules = document.querySelector('.overlay_rules');
const closeOverlayBtn = document.querySelector('.closeBtn');
const resultElem = document.querySelector('.result');
const userResult = document.querySelector('.winLose');

const handImages = [
    'images/icon-paper.svg',
    'images/icon-scissors.svg',
    'images/icon-rock.svg',
];
const hands = ['paper', 'scissors', 'rock'];
let userPicked;
let housePicked;
let randomPick;
let userWins = true;
let draw = false;
let score = 0;

function getRandomHand() {
    randomPick = Math.floor(Math.random() * 3);
    housePicked = hands[randomPick];
}

function checkWin() {
    console.log('0 =', hands[0]);
    console.log('1 =', hands[1]);
    console.log('2 =', hands[2]);
    if (userPicked === housePicked) {
        draw = true;
        userWins = false;

        return;
    } else if (userPicked == hands[0] && housePicked == hands[1]) {
        userWins = false;
        draw = false;
    } else if (userPicked == hands[0] && housePicked == hands[2]) {
        draw = false;
        userWins = true;
    } else if (userPicked == hands[1] && housePicked == hands[0]) {
        draw = false;
        userWins = true;
    } else if (userPicked == hands[1] && housePicked == hands[2]) {
        userWins = false;
        draw = false;
    } else if (userPicked == hands[2] && housePicked == hands[1]) {
        draw = false;
        userWins = true;
    } else if (userPicked == hands[2] && housePicked == hands[0]) {
        draw = false;
        userWins = false;
    } else {
    }
}

function showResult() {
    setTimeout(() => {
        resultElem.innerHTML = `
        <h1 class="winLose"> ${
            draw ? 'Draw' : userWins ? 'You win' : 'You lose'
        } </h1>
        <button id="reset" >play again</button>
        `;
        resultElem.classList.add('resultOut');
        userWins && score++;
        document.getElementById('score').innerText = score;
        if (!draw && userWins) {
            showUserPicked.classList.add('win');
        } else if (!draw && !userWins) {
            showHousePicked.classList.add('win');
        }
    }, 2000);
}

function showPickedHand(index) {
    btnsContainer.classList.add('hide');
    showUserPicked.innerHTML = `
    <div class="${hands[index]}">
        <img src="${handImages[index]}" alt="" />
    </div>
    `;
    winnerContainer.classList.remove('hide');
    setTimeout(() => {
        showHousePicked.innerHTML = `
        <div class="${hands[randomPick]}">
            <img src="${handImages[randomPick]}" alt="" />
        </div>
        `;
    }, 1000);
}

function reset() {
    btnsContainer.classList.remove('hide');
    winnerContainer.classList.add('hide');
    resultElem.classList.remove('resultOut');
    showHousePicked.classList.remove('win');
    showUserPicked.classList.remove('win');
    resultElem.innerHTML = '';
    showHousePicked.innerHTML = '';
    userPicked = '';
    housePicked = '';
    userWins = false;
    draw = false;
    console.log('reset');
}

handBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        userPicked = btn.id;
        getRandomHand();
        showPickedHand(index);
        showResult();
        checkWin();
    });
});

resultElem.addEventListener('click', (e) => {
    elem = e.target.tagName === 'BUTTON';
    elem && reset();
});

rulesBtn.addEventListener('click', () => {
    overlay_rules.classList.remove('hide');
    console.log('reluesbtn');
});
closeOverlayBtn.addEventListener('click', () => {
    overlay_rules.classList.add('hide');
});
