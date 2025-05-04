let words = [];
let currentWord = '';
let correctCount = 0;
let incorrectCount = 0;
let totalAsked = 0;
let totalWords = 0;
let isChecked = false;
let incorrectWords = [];

// DOM elements
const currentWordElement = document.getElementById('current-word');
const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const speakBtn = document.getElementById('speak-btn');
const correctCountElement = document.getElementById('correct-count');
const incorrectCountElement = document.getElementById('incorrect-count');
const totalElement = document.getElementById('total');
const totalIncorrectElement = document.getElementById('total-incorrect');
const remainingCountElement = document.getElementById('remaining-count');
const resultElement = document.getElementById('result');
const toggleIncorrectBtn = document.getElementById('toggle-incorrect-btn');
const incorrectWordsList = document.getElementById('incorrect-words-list');

// Load words from file
async function loadWords() {
    try {
        const response = await fetch('words.txt');
        const text = await response.text();
        words = text.split('\n')
            .map(word => word.trim())
            .filter(word => word.length > 0);
        totalWords = words.length;
        remainingCountElement.textContent = totalWords;
        loadNewWord();
    } catch (error) {
        console.error('Error loading words:', error);
        resultElement.textContent = 'Error loading words. Please check the words.txt file.';
    }
}

// Update incorrect words list
function updateIncorrectWordsList() {
    incorrectWordsList.innerHTML = '';
    incorrectWords.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.correct} <span class="user-spelling">(${item.userSpelling})</span>`;
        incorrectWordsList.appendChild(li);
    });
}

// Toggle incorrect words list visibility
function toggleIncorrectWords() {
    incorrectWordsList.classList.toggle('hidden');
    toggleIncorrectBtn.textContent = incorrectWordsList.classList.contains('hidden') 
        ? 'Show Incorrect Words' 
        : 'Hide Incorrect Words';
}

// Load a new word
function loadNewWord() {
    if (words.length === 0) {
        currentWordElement.textContent = 'No more words!';
        userInput.disabled = true;
        checkBtn.disabled = true;
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].trim();
    words.splice(randomIndex, 1);
    
    currentWordElement.textContent = '?';
    userInput.value = '';
    userInput.disabled = false;
    checkBtn.disabled = false;
    nextBtn.disabled = true;
    resultElement.textContent = '';
    isChecked = false;
    
    // Update remaining count
    remainingCountElement.textContent = words.length;
    
    // Automatically focus on the input field
    userInput.focus();
}

// Speak the current word
function speakWord() {
    if (currentWord) {
        const utterance = new SpeechSynthesisUtterance(currentWord);
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    }
}

// Check the user's answer
function checkAnswer() {
    if (isChecked) return;

    const userAnswer = userInput.value.trim().toLowerCase();
    const correctAnswer = currentWord.toLowerCase();

    totalAsked++;
    totalElement.textContent = totalAsked;
    totalIncorrectElement.textContent = totalAsked;

    if (userAnswer === correctAnswer) {
        correctCount++;
        correctCountElement.textContent = correctCount;
        resultElement.textContent = 'Correct!';
        resultElement.className = 'correct';
    } else {
        incorrectCount++;
        incorrectCountElement.textContent = incorrectCount;
        incorrectWords.push({
            correct: currentWord,
            userSpelling: userInput.value.trim()
        });
        updateIncorrectWordsList();
        resultElement.textContent = `Incorrect! The correct spelling is: ${currentWord}`;
        resultElement.className = 'incorrect';
    }

    isChecked = true;
    userInput.disabled = true;
    checkBtn.disabled = true;
    nextBtn.disabled = false;
}

// Event listeners
speakBtn.addEventListener('click', speakWord);
checkBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', loadNewWord);
toggleIncorrectBtn.addEventListener('click', toggleIncorrectWords);

// Add Enter key listener to input field
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        if (!isChecked && !userInput.disabled) {
            checkAnswer();
        } else if (isChecked && !nextBtn.disabled) {
            loadNewWord();
        }
    }
});

// Add keydown listener to handle Enter key after check and Space key for speaking
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && isChecked && !nextBtn.disabled) {
        event.preventDefault();
        loadNewWord();
    } else if (event.key === ' ' && !event.target.matches('button')) {
        event.preventDefault(); // Prevent space in input and page scroll
        speakWord();
    }
});

// Load words when the page loads
loadWords(); 