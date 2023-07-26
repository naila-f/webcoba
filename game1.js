const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Berikut ini kepanjangan dari HTML yang benar adalah ...",
        choice1: "Home Tool Markup Language",
        choice2: "Hyperlinks and Text Markup Language",
        choice3: "Hyper Text Markup Language",
        choice4: "Hyper Tool Markup Language ",
        choice5: "Hyper Text Mark Language",
        answer:  3,
    },
    {
        question: "Siapa yang telah menciptakan dan mengembangkan HTML ...",
        choice1: "Stefen",
        choice2: "Tim Berners-Lee",
        choice3: "Thomas Alpha Edison",
        choice4: "Albert Einstein",
        choice5: "Tim Bernald",
        answer: 2,
    },
    {
        question: "Nama lembaga yang mengorganisasi HTML dan www adalah ...",
        choice1: "W3C",
        choice2: "CERN",
        choice3: "Oxford",
        choice4: "Enquire",
        choice5: "WW3",
        answer: 1,
    },
    {
        question: "Ekstensi dari halaman web yang benar adalah ...",
        choice1: ".exe",
        choice2: ".docx",
        choice3: ".pptx",
        choice4: ".html",
        choice5: ".htm",
        answer: 4,
    },
    {
        question: "Struktur dasar dokumen HTML terdiri atas ...",
        choice1: "html, head , footer",
        choice2: "html, body, html",
        choice3: "html, head, html",
        choice4: "html, head, body",
        choice5: "html, head, title",
        answer: 4,
    },
    {
        question: "Bagian html yang digunakan untuk menyimpan informasi yang akan dipublish pada halaman web adalah ...",
        choice1: "Html",
        choice2: "Head",
        choice3: "Footer",
        choice4: "Title",
        choice5: "Body",
        answer: 5,
    },
    {
        question: "Bagian dari head yang digunakan untuk menampilkan judul pada halaman browser adalah ...",
        choice1: "Link",
        choice2: "Tittle",
        choice3: "Title",
        choice4: "Head",
        choice5: "Base",
        answer: 3,
    },
    {
        question: "Script untuk menampilkan judul “home” pada halaman browser adalah ...",
        choice1: "<title>home</title>",
        choice2: "<head>home</head>",
        choice3: "<title>body<title>",
        choice4: "<base href=”home”>",
        choice5: "<tittle>home</tittle>",
        answer: 1,
    },
    {
        question: "Perhatikan script berikut ini :  <p>Belajar HTML</p> , bagian dalam script yang disebut sebagai tag penutup adalah...",
        choice1: "<p>",
        choice2: "Belajar HTML",
        choice3: "p",
        choice4: "</p>",
        choice5: "/",
        answer: 4,
    },
    {
        question: "Perhatikan script berikut ini :  <p>Belajar HTML</p> , bagian dalam script yang disebut sebagai content adalah...",
        choice1: "<p>",
        choice2: "Belajar HTML",
        choice3: "p",
        choice4: "</p>",
        choice5: "/",
        answer: 2,
    }

]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()