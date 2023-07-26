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
        question: "Untuk membuat daftar yang tidak berurutan dalam dokumen html menggunakan tag ...",
        choice1: "<ol>",
        choice2: "<ul>",
        choice3: "<p>",
        choice4: "<li>",
        choice5: "<dt>",
        answer:  2,
    },
    {
        question:"Kegunaan tag <ol> digunakan untuk membuat list ...",
        choice1: "List tidak berurutan",
        choice2: "List berurutan",
        choice3: "List kombinasi",
        choice4: "List Acak",
        choice5: "List",
        answer: 2,
    },
    {
        question: "Untuk membuat daftar yang berisi kumpulan definisi dari suatu istilah tertentu dapat menggunakan ...",
        choice1: "Ordered list (daftar berurutan)",
        choice2: "Definition list (daftar definisi)",
        choice3: "Unordered list (daftar tidak berurutan)",
        choice4: "Item list (daftar item)",
        choice5: "Terms list (daftar istilah)",
        answer: 2,
    },
    {
        question: "Untuk membuat daftar atau list gabungan dapat menggunakan kombinasi tag ...",
        choice1: "<ol> dan <ul>",
        choice2: "<ol> dan <li>",
        choice3: "<ul> dan <li>",
        choice4: "<li> dan </li>",
        choice5: "<ol> dan <ol>",
        answer: 1,
    },
    {
        question: "Untuk membuat list dengan angka romawi i, ii, iii menggunakan ...",
        choice1: "<ol type = “A”>",
        choice2: "<ul type = “i”>",
        choice3: "<ol type = “a”>",
        choice4: "<ul type = “a”>",
        choice5: "<ul type = “A”>",
        answer: 2,
    },
    {
        question: "Untuk membuat list dengan huruf a,b,c menggunakan ...",
        choice1: "<ol type = “A”>",
        choice2: "<ul type = “i”>",
        choice3: "<ol type = “a”>",
        choice4: "<ul type = “a”>",
        choice5: "<ul type = “A”>",
        answer: 3,
    },
    {
        question: "Untuk memberikan list bullets menggunakan ...",
        choice1: "<ol type = “circle”>",
        choice2: "<ul type = “circle”>",
        choice3: "<ol type = “disk”>",
        choice4: "<ul type = “disk”>",
        choice5: "<ul type = “square”>",
        answer: 4,
    },
    {
        question: "Untuk membuat list dengan tampilan kotak dapat menggunakan ...",
        choice1: "<ol type = “circle”>",
        choice2: "<ul type = “circle”>",
        choice3: "<ol type = “disk”>",
        choice4: "<ul type = “disk”>",
        choice5: "<ul type = “square”>",
        answer: 5,
    },
    {
        question: "Untuk menghasilkan tampilan H2O, memerlukan scipt ...",
        choice1: "H<sub>2</sub>O",
        choice2: "<sub>H2O</sub>",
        choice3: "H<sup>2</sup>O",
        choice4: "<sup>H2O<</sup>r",
        choice5: "<sub>H<sub>2</sub>O</sub>",
        answer: 1,
    },
    {
        question: "Untuk membuat list berurutan yang akan dimulai dengan angka 5 maka dapat menggunakan atribut ...",
        choice1: "=",
        choice2: "class",
        choice3: "start",
        choice4: "ol",
        choice5: "ul",
        answer: 3,
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