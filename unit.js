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
        question: "Wie heißt der Junge?",
        answers: [
            { text: "Anna", correct: false },
            { text: "Lukas", correct: true },
            { text: "Peter", correct: false },
            { text: "Ich habe keine Ahnung!", correct: false },
        ]
    },
    {
        question: "Woher kommt Lukas?",
        answers: [
            { text: "aus Wien", correct: false },
            { text: "aus Hamburg", correct: false },
            { text: "aus Berlin", correct: true },
            { text: "aus München", correct: false },
        ]
    },
    {
        question: "Woher kommt Anna?",
        answers: [
            { text: "aus Deutschland", correct: false },
            { text: "aus Berlin", correct: false },
            { text: "aus Wien", correct: true },
            { text: "aus Zürich", correct: false },
        ]
    },
    {
        question: "Wie alt ist Lukas?",
        answers: [
            { text: "22", correct: false },
            { text: "23", correct: false },
            { text: "24", correct: true },
            { text: "25", correct: false },
        ]
    },
    {
        question: "Wie alt ist Anna?",
        answers: [
            { text: "21", correct: false },
            { text: "22", correct: true },
            { text: "23", correct: false },
            { text: "24", correct: false },
        ]
    },
    {
        question: "Was studiert Anna?",
        answers: [
            { text: "Biologie", correct: false },
            { text: "Geschichte", correct: true },
            { text: "Physik", correct: false },
            { text: "Chemie", correct: false },
        ]
    },
    {
        question: "Was studiert Lukas?",
        answers: [
            { text: "Geschichte", correct: false },
            { text: "Biologie", correct: true },
            { text: "Mathematik", correct: false },
            { text: "Politik", correct: false },
        ]
    },
    {
        question: "Welche Sprachen spricht Anna?",
        answers: [
            { text: "Deutsch und Englisch", correct: false },
            { text: "Deutsch und ein bisschen Englisch", correct: true },
            { text: "Deutsch und Spanisch", correct: false },
            { text: "nur Deutsch", correct: false },
        ]
    },
    {
        question: "Welche Sprachen spricht Lukas?",
        answers: [
            { text: "Deutsch und Englisch", correct: false },
            { text: "nur Deutsch", correct: false },
            { text: "Deutsch, Englisch und Spanisch", correct: true },
            { text: "Deutsch, Englisch und Französisch", correct: false },
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