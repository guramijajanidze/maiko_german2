// Vocabulary //
const headings = document.querySelectorAll(".unit_vocabulary .vocabulary_title");

headings.forEach(heading => {
    heading.addEventListener("click", () => {
        // Get the next sibling element, which should be the corresponding vocabulary_hidden div
        const content = heading.nextElementSibling;

        if (content) {
            // Toggle a "show" class
            content.classList.toggle("show");
        }
    });
});




// DISPLAY: FLASHCARDS< QUIZ< FILL IN< DRAG AND DROP //

document.addEventListener("DOMContentLoaded", () => {
    // Map buttons (assume these IDs exist) to sections
    const tabs = {
        "unit_excercisetable_row1_box1": document.querySelector(".flashcards"),
        "unit_excercisetable_row1_box2": document.querySelector(".unit_excercisetable_row2"),
        "unit_excercisetable_row1_box3": document.querySelector(".fillin"),
        "unit_excercisetable_row1_box4": document.querySelector(".dragdrop")
    };

    // Hide all sections initially
    Object.values(tabs).forEach(section => {
        if(section) section.style.display = "none";
    });

    // Add click event to each tab button
    Object.keys(tabs).forEach(tabId => {
        const button = document.getElementById(tabId);
        const section = tabs[tabId];

        if(button && section){
            button.addEventListener("click", () => {
                Object.values(tabs).forEach(s => s.style.display = "none");
                
                section.style.display = "block";

                Object.keys(tabs).forEach(id => document.getElementById(id).classList.remove("active"));
                button.classList.add("active");
            });
        }
    });
});

// QUIZ //
const questions = [
    {
        question: "Wie heißt der Großvater?",
        answers: [
            { text: "Hans", correct: true },
            { text: "Michael", correct: false },
            { text: "Max", correct: false },
            { text: "Lukas", correct: false },
        ]
    },
    {
        question: "Wie alt ist die Großmutter?",
        answers: [
            { text: "68", correct: true },
            { text: "70", correct: false },
            { text: "38", correct: false },
            { text: "12", correct: false },
        ]
    },
    {
        question: "Was ist der Beruf des Vaters?",
        answers: [
            { text: "Ingenieur", correct: true },
            { text: "Lehrer", correct: false },
            { text: "Arzt", correct: false },
            { text: "Schüler", correct: false },
        ]
    },
    {
        question: "Wie heißt die Mutter?",
        answers: [
            { text: "Angelina", correct: true },
            { text: "Gertrud", correct: false },
            { text: "Anna", correct: false },
            { text: "Lukas", correct: false },
        ]
    },
    {
        question: "Wie alt ist Lukas?",
        answers: [
            { text: "10", correct: true },
            { text: "8", correct: false },
            { text: "12", correct: false },
            { text: "38", correct: false },
        ]
    },
    {
        question: "Was ist Annas Beruf?",
        answers: [
            { text: "Schülerin", correct: true },
            { text: "Lehrerin", correct: false },
            { text: "Ärztin", correct: false },
            { text: "Ingenieurin", correct: false },
        ]
    },
    {
        question: "Wie heißt der Bruder?",
        answers: [
            { text: "Max", correct: true },
            { text: "Hans", correct: false },
            { text: "Michael", correct: false },
            { text: "Lukas", correct: false },
        ]
    },
    {
        question: "Was ist der Beruf der Großmutter?",
        answers: [
            { text: "Ärztin", correct: true },
            { text: "Lehrerin", correct: false },
            { text: "Ingenieurin", correct: false },
            { text: "Schülerin", correct: false },
        ]
    },
    {
        question: "Wie alt ist der Vater?",
        answers: [
            { text: "40", correct: true },
            { text: "38", correct: false },
            { text: "70", correct: false },
            { text: "8", correct: false },
        ]
    },
    {
        question: "Wie alt ist der Bruder?",
        answers: [
            { text: "8", correct: true },
            { text: "10", correct: false },
            { text: "12", correct: false },
            { text: "40", correct: false },
        ]
    }
];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

    /*function adjective () {
        if (score === 8) {
            console.log("Du bist super!")
        }  else if (score > 5) {
            console.log("Das ist auch Okay...") 
        } else {
            console.log("Du bist Bandzi!")
        }
    }*/


function showScore(){
    resetState();
    questionElement.innerHTML = `Dein Ergebnis ist ${score} / ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();




/* HERO ANIMATION */
// Hero and intro div
const intro = document.querySelector('.intro_family');
const hero = document.getElementById('hero');
const heroBubble = document.querySelector('#hero .hero_bubble');
const heroBubbleP = heroBubble.querySelector('p');

let firstIntroDone = false; // track if first intro already happened

// When intro clicked, toggle hero
intro.addEventListener('click', () => {
    hero.classList.add('show');

    if (!firstIntroDone) {
        // Show Lukas' text with 0.5s delayed fade-in
        heroBubble.classList.remove('show'); // ensure it's hidden
        setTimeout(() => {
            heroBubble.classList.add('show');
        }, 500);

        firstIntroDone = true; // mark that intro animation is done
    } else {
        // For subsequent clicks, show bubble immediately
        heroBubble.classList.add('show');
    }
});

// FAMILY MEMBERS CLICK
const members = document.querySelectorAll('.family-tree .member');
const hiddenTexts = document.querySelectorAll('.family-tree .hidden_text');

members.forEach((member, index) => {
    member.addEventListener('click', () => {
        const text = hiddenTexts[index].innerHTML;
        heroBubbleP.innerHTML = text;

        // Make sure hero is visible
        if (!hero.classList.contains('show')) {
            hero.classList.add('show');
        }

        // Show bubble immediately (no delay for subsequent clicks)
        heroBubble.classList.add('show');
    });
});


//* Hover over Flashcards - Disappear Luka's Bubble" */

// SELECT LUKAS' BUBBLE
const lukaBubble = document.querySelector('#hero .hero_bubble');

// ALL EXERCISE TABS
const exerciseTabs = document.querySelectorAll('.unit_excercisetable_row1_box');

// ALL FLASHCARDS
const flashcards = document.querySelectorAll('.flashcards .maincontainer');

// FUNCTION TO HIDE BUBBLE
function hideLukaBubble() {
    lukaBubble.classList.remove('show');
}

// ADD HOVER EVENT TO TABS
exerciseTabs.forEach(tab => {
    tab.addEventListener('mouseenter', hideLukaBubble);
});

// ADD HOVER EVENT TO FLASHCARDS
flashcards.forEach(card => {
    card.addEventListener('mouseenter', hideLukaBubble);
});


