let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0;
let totalQuestions = 0;

let timeLeft = 60;        // total quiz time in seconds
let timerInterval;
let startTime;
let quizEnded = false;    // guard flag — prevents race condition between timer and nextQuestion()

const API_BASE = 'http://localhost:8080';

// ── Auth helpers ──────────────────────────────────────────────────────────

function getAuthHeaders() {
    const token = localStorage.getItem('jwt_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

/** Redirects to index if no token found (protects the quiz page). */
function requireAuth() {
    if (!localStorage.getItem('jwt_token')) {
        window.location.href = 'index.html';
    }
}

// ── Fetch Questions ───────────────────────────────────────────────────────

async function fetchQuestions() {
    requireAuth();

    // Display player name in header
    const playerName = localStorage.getItem('playerName') || 'Player';
    const playerEl = document.getElementById('player-name');
    if (playerEl) playerEl.textContent = `Playing as: ${playerName}`;

    try {
        const response = await fetch(`${API_BASE}/api/questions/random/10`, {
            headers: getAuthHeaders()
        });

        if (response.status === 401) {
            // Token expired — redirect to login
            localStorage.removeItem('jwt_token');
            window.location.href = 'index.html';
            return;
        }

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        questions = await response.json();
        totalQuestions = questions.length;

        document.getElementById('total-questions').textContent = totalQuestions;

        startTime = Date.now();
        startTimer();
        displayQuestion();

    } catch (error) {
        console.error('Error fetching questions:', error);
        document.getElementById('question-text').textContent =
            'Failed to load questions. Please check that the backend is running.';
    }
}

// ── Timer ─────────────────────────────────────────────────────────────────

function startTimer() {
    const timeElement = document.getElementById('time');

    timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        // Turn red in final 10 seconds
        if (timeLeft <= 10) {
            timeElement.style.color = '#ff4757';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function calculateTimeTaken() {
    return Math.floor((Date.now() - startTime) / 1000);
}

// ── Display Question ──────────────────────────────────────────────────────

function displayQuestion() {
    if (questions.length === 0) return;

    const questionText     = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestion  = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.questionText;
    optionsContainer.innerHTML = '';

    // Hide next button — user must click an answer to advance
    document.getElementById('next-button').style.display = 'none';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.addEventListener('click', () =>
            selectAnswer(button, option, currentQuestion.id)
        );
        optionsContainer.appendChild(button);
    });

    document.getElementById('current-question').textContent =
        currentQuestionIndex + 1;
}

// ── Answer Selection & Server-Side Validation ─────────────────────────────

async function selectAnswer(clickedButton, selectedOption, questionId) {
    // Disable all buttons immediately to prevent double-clicks
    const allButtons = document.querySelectorAll('.option');
    allButtons.forEach(btn => (btn.disabled = true));

    try {
        const response = await fetch(`${API_BASE}/api/questions/check`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ questionId, selectedAnswer: selectedOption })
        });

        if (!response.ok) throw new Error('Answer check failed');

        const result = await response.json(); // { correct: bool, correctAnswer: "..." }

        // ── Visual Feedback ────────────────────────────────────────────────
        allButtons.forEach(btn => {
            if (btn.textContent === result.correctAnswer) {
                btn.classList.add('correct');   // always highlight the correct answer
            }
        });

        if (!result.correct) {
            clickedButton.classList.add('incorrect'); // highlight wrong selection in red
        }

        if (result.correct) correctAnswers++;

    } catch (error) {
        console.error('Error checking answer:', error);
    }

    // Advance after feedback delay (800ms so user can see result)
    setTimeout(() => {
        if (!quizEnded) nextQuestion();
    }, 800);
}

// ── Navigation ────────────────────────────────────────────────────────────

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        clearInterval(timerInterval);
        endQuiz();
    }
}

// ── End Quiz & Submit Result ──────────────────────────────────────────────

async function endQuiz() {
    if (quizEnded) return;   // prevents double-call from timer + next button
    quizEnded = true;
    clearInterval(timerInterval);

    const timeTaken  = calculateTimeTaken();
    const playerName = localStorage.getItem('playerName') || 'Anonymous';

    const resultData = {
        score:          correctAnswers,
        totalQuestions: totalQuestions,
        timeTaken:      timeTaken,
        playerName:     playerName
    };

    try {
        await fetch(`${API_BASE}/api/results`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(resultData)
        });
    } catch (error) {
        console.error('Error saving quiz result:', error);
    }

    // Pass score to result page via localStorage
    localStorage.setItem('quizScore', correctAnswers);
    localStorage.setItem('totalQuestions', totalQuestions);

    window.location.href = 'result.html';
}

// ── Init ──────────────────────────────────────────────────────────────────

window.onload = fetchQuestions;
