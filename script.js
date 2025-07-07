const questions = [
    {
        question: "What tag is used to create a hyperlink in HTML?",
        options: ['<link>', '<a>', '<href>', '<hyperlink>'],
        answer: 1
    },
    {
        question: "Which CSS property controls the text size?",
        options: ['font-style', 'text-size', 'font-size', 'text-style'],
        answer: 2
    },
    {
        question: "Which is not a JavaScript Framework?",
        options: ["Python Script", "JQuery", "Django", "NodeJS"],
        answer: 2
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ['var', 'let', 'const', 'define'],
        answer: 2
    },
    {
        question: "Which is used for Connect To Database?",
        options: ["PHP", "HTML", "JS", "All"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOptionIndex = null;

const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const optionsList = document.getElementById('option-list');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const skipBtn = document.getElementById('skip-btn');
const restartBtn = document.getElementById('restart-btn');
const categoryEl = document.getElementById('category');

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    resetState();
    selectedOptionIndex = null;
    const q = questions[currentQuestion];
    questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;

    q.options.forEach((option, index) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => {
            document.querySelectorAll('.options button').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedOptionIndex = index;
        };
        li.appendChild(btn);
        optionsList.appendChild(li);
    });

}

function resetState() {
    optionsList.innerHTML = '';
}

function selectAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const allButtons = document.querySelectorAll('.options button');

    allButtons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer) {
            btn.classList.add('correct');
        } else if (i === selectedIndex) {
            btn.classList.add('wrong');
        }
    });

    if (selectedIndex === q.answer) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
    }

    navigator.vibrate?.(200);
}

nextBtn.addEventListener('click', () => {
    if (selectedOptionIndex !== null) {
        selectAnswer(selectedOptionIndex);
    }
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            showFinalScore();
        }
    }, 500);
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

skipBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showFinalScore();
    }
});

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = 'Score: 0';
    restartBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    prevBtn.style.display = 'inline-block';
    skipBtn.style.display = 'inline-block';
    loadQuestion();
});

function showFinalScore() {
    questionEl.textContent = `Quiz Completed!`;
    optionsList.innerHTML = `<li><strong>Your Score: ${score}/${questions.length}</strong></li>`;
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    skipBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
}

window.addEventListener('beforeunload', () => {
    localStorage.setItem('quiz-score', score);
});