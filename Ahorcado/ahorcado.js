const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [4, 5, 1, 1],
    [4, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
};

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#addd';
    ctx.fillRect(...bodyPart);
};

const endGame = message => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';

    // Mostrar mensaje de fin de juego
    const endMessage = document.createElement('p');
    endMessage.innerText = message;
    wordContainer.appendChild(endMessage);
};

const correctLetter = letter => {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) endGame('👻 ¡Bien echo! ¡Encontraste la palabra correcta! 👻');
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) {
        endGame('¡Moriste! 😣 La palabra correcta era: ' + selectedWord.join(''));
    }
};

const letterInput = letter => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterBox = document.createElement('div');
        letterBox.innerHTML = letter.toUpperCase();
        letterBox.classList.add('letter-box');
        letterBox.classList.add('hidden');
        wordContainer.appendChild(letterBox);
    });
};


const categories = {
    animales: ['LEON', 'ELEFANTE', 'TIGRE', 'JIRAFA', 'TORTUGA'],
    frutas: ['MANZANA', 'PLATANO', 'UVA', 'KIWI', 'PIÑA'],
    paises: ['MEXICO', 'CHINA', 'INDIA', 'BRASIL', 'RUSIA']
};

const selectRandomWordByCategory = category => {
    const randomWord = categories[category][Math.floor(Math.random() * categories[category].length)];
    return randomWord;
};

const selectRandomWord = category => {
    let word = selectRandomWordByCategory(category).toUpperCase();
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width = 1000;
    ctx.canvas.height = 200;z
    ctx.scale(36, 26);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#AB351B';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord('paises'); // Cambia 'frutas' por la categoría que desees
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame);